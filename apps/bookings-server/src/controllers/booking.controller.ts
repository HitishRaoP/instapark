import { axios, Request, Response, sendResponse, toUnixTimestamp } from "@instapark/utils";
import { ApiResponse, BookingOTP, BookingRequest, BookingStatus, Listing, Payment, PaymentRequest } from "@instapark/types";
import { LockingService } from "../services/locking.service";
import { BookingService } from "../services/booking.service";
import { Cashfree } from "cashfree-pg";
import { BookingDB } from "../services/booking.db";
import { BookingModel, BookingOTPModel } from "../models/booking.model";

export const lock = async (req: Request, res: Response) => {
    try {
        const lockingRequest = req.body as BookingRequest;

        const lockingService = new LockingService(lockingRequest);

        const result = await lockingService.book();

        if (result.success && result.booking) {
            Cashfree.XClientId = "TEST10180324795c6ed369800e535fc242308101";
            Cashfree.XClientSecret = "cfsk_ma_test_ea216f531ab789cd1bb6c0d98bf6f4a6_179a58b2";
            Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

            async function createOrder() {
                const request = {
                    "order_amount": 1,
                    "order_currency": "INR",
                    "customer_details": {
                        "customer_id": "node_sdk_test",
                        "customer_name": "",
                        "customer_email": "hitishraop@gmail.com",
                        "customer_phone": "9019205231"
                    },
                    "order_meta": {
                        "return_url": "https://test.cashfree.com/pgappsdemos/return.php?order_id=order_123"
                    },
                    "order_note": ""
                }

                return Cashfree.PGCreateOrder("2023-08-01", request)
            }

            const response = await createOrder();
            console.log(response.data.payment_session_id);

            sendResponse(res, 200, result.message, "SUCCESS", {
                c: result.booking,
                orderId: response.data.order_id,
                payment_session_id: response.data.payment_session_id
            });
        } else {
            sendResponse(res, 200, result.message, "FAILURE", null);
        }
    } catch (error) {
        sendResponse(res, 500, `Error creating Booking: ${error}`, "FAILURE", null);
    }
}

export const book = async (req: Request, res: Response) => {
    try {
        const bookingRequest = req.body as PaymentRequest;

        const bookingService = new BookingService(bookingRequest);

        const result = await bookingService.book();

        if (result.status == "SUCCESS") {
            return sendResponse(res, 200, result.message, "SUCCESS", result.data);
        } else {
            return sendResponse(res, 200, result.message, "FAILURE", result);
        }

    } catch (error) {
        sendResponse(res, 500, `Error creating Booking: ${error}`, "FAILURE", null);
    }
}

export const getBookings = async (req: Request, res: Response) => {
    try {
        const { startDate, endDate, listingId, userId, status } = req.query as unknown as { startDate: number, endDate: number, listingId: string, userId: string, status: string }

        if (startDate && endDate) {
            const bookings = await BookingDB.findBookings(startDate, endDate);
            return sendResponse(res, 200, "Bookings fetched successfully", "SUCCESS", bookings);
        }

        if (listingId) {
            const bookings = await BookingDB.findBookingsByListingId(listingId);
            return sendResponse(res, 200, "Bookings fetched successfully", "SUCCESS", bookings);
        }

        if (userId && status === "upcoming") {
            const listings = await axios.get<ApiResponse<Listing[]>>(`http://localhost:8087/listings/listings/all?userId=${userId}`).then(res => res.data.data)

            const bookings = await BookingModel.find({ listingId: { $in: listings?.map(l => l.id) } }, { _id: 0, __v: 0 })

            return sendResponse(res, 200, "Bookings fetched successfully", "SUCCESS", bookings);
        }

        if (userId) {
            const bookings = await BookingModel.find({ userId, status: { $nin: ["Locked"] } }, { _id: 0, __v: 0 })
            return sendResponse(res, 200, "Bookings fetched successfully", "SUCCESS", bookings);
        }



        if (userId && status === "checkingOut") {
            const listings = await axios.get<ApiResponse<Listing[]>>(`http://localhost:8087/listings/listings/all?userId=${userId}`).then(res => res.data.data)

            const bookings = await BookingModel.find({ listingId: { $in: listings?.map(l => l.id) }, startDate: { $lt: toUnixTimestamp(new Date()) } }, { _id: 0, __v: 0 })

            return sendResponse(res, 200, "Bookings fetched successfully", "SUCCESS", bookings);
        }

        if (userId && status === "current") {
            const listings = await axios.get<ApiResponse<Listing[]>>(`http://localhost:8087/listings/listings/all?userId=${userId}`).then(res => res.data.data)

            const bookings = await BookingModel.find({ listingId: { $in: listings?.map(l => l.id) } }, { _id: 0, __v: 0 })

            return sendResponse(res, 200, "Bookings fetched successfully", "SUCCESS", bookings);
        }


    } catch (error) {
        sendResponse(res, 500, `Error creating Booking: ${error}`, "FAILURE", null);
    }
}

export const getOtp = async (req: Request, res: Response) => {
    try {
        const { bookingId } = req.params as { bookingId: string }
        const otp = await BookingOTPModel.find({ bookingId })
        return sendResponse(res, 200, "OTP  fetched successfully", "SUCCESS", { otp: otp[0].otp });
    } catch (error) {
        sendResponse(res, 500, `Error Fetching OTP ${error}`, "FAILURE", null);

    }
}