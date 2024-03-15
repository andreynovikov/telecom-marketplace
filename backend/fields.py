from flask_bcrypt import Bcrypt
from peewee import CharField, FieldAccessor


bcrypt = Bcrypt()


class BcryptHash(str):
    """An bcrypt hash"""

    def verify(self, password):
        """Validates the plain text password against this hash"""
        return bcrypt.check_password_hash(self, password)


class PasswordFieldAccessor(FieldAccessor):
    def __get__(self, instance, instance_type=None):
        """Returns an bcrypt hash"""
        value = super().__get__(instance, instance_type=instance_type)

        if instance is not None:
            if value is None:
                return None

            return BcryptHash(value)

        return value

    def __set__(self, instance, value):
        """Sets the password hash"""
        if value is not None:
            if isinstance(value, BcryptHash):
                value = str(value)
            else:
                # If value is a plain text password, hash it.
                value = bcrypt.generate_password_hash(value).decode()

        super().__set__(instance, value)


class PasswordField(CharField):
    accessor_class = PasswordFieldAccessor

    def python_value(self, value):
        """Returns an bcrypt hash."""
        if value is None:
            return None

        return BcryptHash(value)
