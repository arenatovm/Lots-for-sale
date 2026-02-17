import json
import os
import time
import uuid
import boto3

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(os.environ["TABLE_NAME"])

def _resp(status, body):
    return {
        "statusCode": status,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "content-type",
            "Access-Control-Allow-Methods": "OPTIONS,POST",
        },
        "body": json.dumps(body),
    }

def lambda_handler(event, context):
    method = event.get("requestContext", {}).get("http", {}).get("method")
    if method == "OPTIONS":
        return _resp(200, {"ok": True})

    try:
        body = event.get("body") or "{}"
        if isinstance(body, str):
            body = json.loads(body)

        name = (body.get("name") or "").strip()
        phone = (body.get("phone") or "").strip()
        message = (body.get("message") or "").strip()
        lot_id = (body.get("lotId") or "").strip()

        if not name or not phone or not lot_id:
            return _resp(400, {"error": "Missing required fields: name, phone, lotId"})

        lead_id = str(uuid.uuid4())
        now = int(time.time())

        item = {
            "leadId": lead_id,
            "createdAt": now,
            "name": name,
            "phone": phone,
            "message": message,
            "lotId": lot_id,
            "source": "website",
        }

        table.put_item(Item=item)
        return _resp(200, {"ok": True, "leadId": lead_id})

    except Exception as e:
        return _resp(500, {"error": str(e)})
