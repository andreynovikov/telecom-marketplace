import base64
import hashlib
import hmac
import json
import os

from random import randrange


def createHash(salt, number):
    hasher = hashlib.sha256()
    hasher.update((salt + str(number)).encode('utf-8'))
    hash_value = hasher.digest()
    return hash_value.hex()


def createHmac(secret_key, challenge):
    hash_algorithm = 'sha256'
    hmac_object = hmac.new(secret_key.encode(), challenge.encode(), getattr(hashlib, hash_algorithm))
    return hmac_object.hexdigest()


def challenge_altcha():
    salt = os.urandom(12).hex()
    secret_number = randrange(10000, 100000, 1)
    hmac_secret = os.environ.get('ALTCHA_HMAC_KEY')

    challenge = createHash(salt, secret_number)
    signature = createHmac(hmac_secret, challenge)

    return {
        'algorithm': 'SHA-256',
        'challenge': challenge,
        'salt': salt,
        'signature': signature
    }


def validate_altcha(payload):
    # use_altcha = os.environ.get("USE_ALTCHA", 'False').lower() in ('True', 'true', '1', 't')

    # if(not use_altcha):
    #     return True

    # else:
    if payload:
        data = json.loads(base64.b64decode(payload))

        hmac_secret = os.environ.get('ALTCHA_HMAC_KEY')

        alg_ok = data['algorithm'] == 'SHA-256'
        challenge_ok = data['challenge'] == createHash(data['salt'], data['number'])
        signature_ok = data['signature'] == createHmac(hmac_secret, data['challenge'])

        if alg_ok and challenge_ok and signature_ok:
            return True

    return False
