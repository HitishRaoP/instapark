import { sendResponse } from "@instapark/utils";
import { Request, Response } from "express";
import { BOOKINGS_SERVER_CONSTANTS } from "../constants/bookings-server-constants";
import { VendorRequest } from "@instapark/types";
import { SessionRequest } from "@instapark/auth";

export const createVendor = (req: SessionRequest, res: Response) => {
    try {
        const vendorRequest: VendorRequest = req.body;

        const options = {
            method: 'POST',
            headers: {
                'x-api-version': BOOKINGS_SERVER_CONSTANTS.CASHFREE.CASHFREE_API_VERSION,
                'x-client-id': BOOKINGS_SERVER_CONSTANTS.CASHFREE.CASHFREE_CLIENT_ID,
                'x-client-secret': BOOKINGS_SERVER_CONSTANTS.CASHFREE.CASHFREE_CLIENT_SECRET,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "vendor_id": vendorRequest.vendor_id,
                "status": "ACTIVE",
                "name": vendorRequest.name,
                "email": vendorRequest.email,
                "phone": vendorRequest.phone,
                "verify_account": true,
                "dashboard_access": false,
                "schedule_option": 1,
                "bank": {
                    "account_number": vendorRequest.bank.account_number,
                    "account_holder": vendorRequest.bank.account_holder,
                    "ifsc": vendorRequest.bank.ifsc
                },
                "kyc_details": {
                    "account_type": "INDIVIDUAL",
                    "business_type": "Travel and Hospitality",
                    "pan": vendorRequest.kyc_details.pan
                }
            })
        };

        fetch('https://sandbox.cashfree.com/pg/easy-split/vendors', options)
            .then(response => response.json())
            .then(response => {
                sendResponse(res, 200,
                    response.message ? "Vendor already exists" : "Vendor Created Successfully"
                    , "SUCCESS", null);
            })
            .catch(error => {
                sendResponse(res, 500, `Error Creating vendor: ${error}`, "FAILURE", null);
            });

    } catch (error) {
        sendResponse(res, 500, "Internal server Error", "FAILURE", null);
    }
}

export const getVendor = (req: Request, res: Response) => {
    try {
        const { userId } = req.query

        const options = {
            method: 'GET',
            headers: {
                'x-api-version': BOOKINGS_SERVER_CONSTANTS.CASHFREE.CASHFREE_API_VERSION,
                'x-client-id': BOOKINGS_SERVER_CONSTANTS.CASHFREE.CASHFREE_CLIENT_ID,
                'x-client-secret': BOOKINGS_SERVER_CONSTANTS.CASHFREE.CASHFREE_CLIENT_SECRET,
            }
        };

        fetch(`https://sandbox.cashfree.com/pg/easy-split/vendors/${userId}`, options)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                sendResponse(res, 200, response.message, "SUCCESS", response);
            })
            .catch(error => {
                sendResponse(res, 500, `Error Fetching vendor details: ${error}`, "FAILURE", null);
            });
    } catch (error) {
        sendResponse(res, 500, "Internal server Error", "FAILURE", null);
    }
}

export const updateVendor = (req: SessionRequest, res: Response) => {
    try {
        /**Getting UserId from the session */
        const session = req.session;
        const userId = session?.getUserId() as string;

        const vendorRequest: VendorRequest = req.body;
        const options = {
            method: 'POST',
            headers: {
                'x-api-version': BOOKINGS_SERVER_CONSTANTS.CASHFREE.CASHFREE_API_VERSION,
                'x-client-id': BOOKINGS_SERVER_CONSTANTS.CASHFREE.CASHFREE_CLIENT_ID,
                'x-client-secret': BOOKINGS_SERVER_CONSTANTS.CASHFREE.CASHFREE_CLIENT_SECRET,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "vendor_id": userId,
                "status": "ACTIVE",
                "name": vendorRequest.name,
                "email": vendorRequest.email,
                "phone": vendorRequest.phone,
                "verify_account": true,
                "dashboard_access": false,
                "schedule_option": 1,
                "bank": {
                    "account_number": vendorRequest.bank.account_number,
                    "account_holder": vendorRequest.bank.account_holder,
                    "ifsc": vendorRequest.bank.ifsc
                },
                "kyc_details": {
                    "account_type": "BUSINESS",
                    "business_type": "Travel and Hospitality",
                    "pan": vendorRequest.kyc_details.pan
                }
            })
        };

        fetch(`https://sandbox.cashfree.com/pg/easy-split/vendors/${userId}`, options)
            .then(response => response.json())
            .then(response => {
                sendResponse(res, 200, response.message, "SUCCESS", response);
            })
            .catch(error => {
                sendResponse(res, 500, `Error Creating vendor: ${error}`, "FAILURE", null);
            });

    } catch (error) {
        sendResponse(res, 500, "Internal server Error", "FAILURE", null);
    }
}

export const getDocumentStatus = (req: SessionRequest, res: Response) => {
    try {
        /**Getting UserId from the session */
        const session = req.session;
        const userId = session?.getUserId() as string;

        const options = {
            method: 'GET',
            headers: {
                'x-api-version': BOOKINGS_SERVER_CONSTANTS.CASHFREE.CASHFREE_API_VERSION,
                'x-client-id': BOOKINGS_SERVER_CONSTANTS.CASHFREE.CASHFREE_CLIENT_ID,
                'x-client-secret': BOOKINGS_SERVER_CONSTANTS.CASHFREE.CASHFREE_CLIENT_SECRET,
            }
        };

        fetch(`https://sandbox.cashfree.com/pg/easy-split/vendor-docs/${userId}`, options)
            .then(response => response.json())
            .then(response => {
                sendResponse(res, 200, response.message, "SUCCESS", response);
            })
            .catch(error => {
                sendResponse(res, 500, `Error Fetching vendor details: ${error}`, "FAILURE", null);
            });
    } catch (error) {
        sendResponse(res, 500, "Internal server Error", "FAILURE", null);
    }
}

export const getBalance = (req: SessionRequest, res: Response) => {
    try {
        const { userId } = req.query;

        const options = {
            method: 'GET',
            headers: {
                'x-api-version': BOOKINGS_SERVER_CONSTANTS.CASHFREE.CASHFREE_API_VERSION,
                'x-client-id': BOOKINGS_SERVER_CONSTANTS.CASHFREE.CASHFREE_CLIENT_ID,
                'x-client-secret': BOOKINGS_SERVER_CONSTANTS.CASHFREE.CASHFREE_CLIENT_SECRET,
            }
        };

        fetch(`https://sandbox.cashfree.com/pg/easy-split/vendors/${userId}/balance`, options)
            .then(response => response.json())
            .then(response => {
                sendResponse(res, 200, response.message, "SUCCESS", response);
            })
            .catch(error => {
                sendResponse(res, 500, `Error Fetching vendor details: ${error}`, "FAILURE", null);
            });
    } catch (error) {
        sendResponse(res, 500, "Internal server Error", "FAILURE", null);
    }
}

export const createOnDemandBalanceTransfer = (req: Request, res: Response) => {
    try {
        const { vendorId, transfer_amount } = req.body as {
            vendorId: string,
            transfer_amount: number
        };
        const options = {
            method: 'POST',
            headers: {
                'x-api-version': BOOKINGS_SERVER_CONSTANTS.CASHFREE.CASHFREE_API_VERSION,
                'x-client-id': BOOKINGS_SERVER_CONSTANTS.CASHFREE.CASHFREE_CLIENT_ID,
                'x-client-secret': BOOKINGS_SERVER_CONSTANTS.CASHFREE.CASHFREE_CLIENT_SECRET,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    "transfer_from": "VENDOR",
                    "transfer_type": "ON_DEMAND",
                    "transfer_amount": transfer_amount,
                    "currency": "INR",
                    "tags": {
                        "order_id": "order_101803242tLf64JLArnG17VJEvwg6hkcY1B"
                    }
                }
            )
        };

        fetch(`https://sandbox.cashfree.com/pg/easy-split/vendors/${vendorId}/transfer`, options)
            .then(response => response.json())
            .then(response => {
                sendResponse(res, 200, response.message, "SUCCESS", response);
            })
            .catch(error => {
                sendResponse(res, 500, `Error transering amount: ${error}`, "FAILURE", null);
            });
    } catch (error) {
        sendResponse(res, 500, "Internal server Error", "FAILURE", null);
    }
}
