# ProjectName SDK exists test

import pytest
from catchdomssecurity_sdk import CatchdomsSecuritySDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = CatchdomsSecuritySDK.test(None, None)
        assert testsdk is not None
