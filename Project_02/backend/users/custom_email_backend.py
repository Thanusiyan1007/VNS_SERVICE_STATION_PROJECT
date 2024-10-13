# users/custom_email_backend.py
from django.core.mail.backends.smtp import EmailBackend

class CustomEmailBackend(EmailBackend):
    def open(self):
        """
        Open a network connection. This method is a slightly modified version of Django's
        EmailBackend `open()` method that removes unsupported arguments for starttls().
        """
        if self.connection:
            return False

        try:
            # Initialize the connection without custom TLS arguments
            self.connection = self.connection_class(self.host, self.port, timeout=self.timeout)

            # Initiate TLS if required
            if self.use_tls:
                self.connection.ehlo()
                self.connection.starttls()  # Don't pass keyfile and certfile arguments
                self.connection.ehlo()

            # Login if credentials are provided
            if self.username and self.password:
                self.connection.login(self.username, self.password)

            return True
        except:
            if not self.fail_silently:
                raise
            return False
