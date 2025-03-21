import {
	GraphQLList,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLString,
} from 'graphql';
import {
	EarningsType,
	VendorType,
	VendorBalanceType,
} from '../types/vendor.graphql.type';
import { axios } from '@instapark/utils';
import { ApiResponse, Listing, Vendor, VendorBalance } from '@instapark/types';
import { API_SERVER_CONSTANTS } from '../constants/api-server-constants';
import { Earnings } from '@instapark/types/src/Booking';
import { ListingType } from '../types/listing.graphql.type';

export const VendorQuery = new GraphQLObjectType({
	name: 'VendorQuery',
	fields: {
		getVendor: {
			type: VendorType,
			args: {
				vendorId: { type: new GraphQLNonNull(GraphQLString) },
			},
			resolve: async (_, args) => {
				const response = (
					await axios.get<ApiResponse<Vendor>>(
						API_SERVER_CONSTANTS.ENDPOINTS.BOOKINGS.VENDOR.GET,
						{
							params: {
								userId: args.vendorId,
							},
						},
					)
				).data.data;
				return response;
			},
		},
		getEarningsDashboard: {
			type: new GraphQLObjectType({
				name: 'EarningsDashboard',
				fields: {
					listings: { type: new GraphQLList(ListingType) },
					earnings: {
						type: EarningsType,
						resolve: async (parent) => {
							const response = await axios.get<ApiResponse<Earnings>>(
								API_SERVER_CONSTANTS.ENDPOINTS.BOOKINGS.BOOKING.EARNING_STATS,
								{
									params: {
										listingIds: parent.listings.map((l: Listing) => l.id),
									},
								},
							);
							return response.data.data;
						},
					},
					vendorBalance: {
						type: VendorBalanceType,
						args: {
							vendorId: { type: new GraphQLNonNull(GraphQLString) },
						},
						resolve: async (_, { vendorId }) => {
							const response = await axios.get<ApiResponse<VendorBalance>>(
								API_SERVER_CONSTANTS.ENDPOINTS.BOOKINGS.VENDOR.BALANCE,
								{ params: { vendorId } },
							);
							return response.data.data;
						},
					},
				},
			}),
			args: {
				userId: { type: new GraphQLNonNull(GraphQLString) },
			},
			resolve: async (_, { userId }) => {
				const response = await axios.get<ApiResponse<Listing[]>>(
					API_SERVER_CONSTANTS.ENDPOINTS.LISTINGS.LISTING.GET,
					{ params: { userId } },
				);
				return {
					listings: response.data.data,
				};
			},
		},
	},
});
