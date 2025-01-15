import { Payment, PaymentType } from "@instapark/types";
import { model, Schema } from "@instapark/utils";

export const paymentSchema = new Schema<Payment>(
    {
        bookingId: {
            type: String,
            required: true,
            ref: "Booking"
        },
        userId: {
            type: String,
            required: true,
        },
        orderId: {
            type: String,
            required: true
        },
        cfPaymentId: {
            type: String,
            required: true
        },
        paymentType: {
            type: String,
            enum: PaymentType,
            required: true
        }
    }, {
    timestamps: true
})

export const PaymentModel = model<Payment>("Payment", paymentSchema)