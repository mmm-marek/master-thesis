import {
    AbstractFulfillmentService,
    Cart,
    Fulfillment,
    LineItem,
    Order,
} from "@medusajs/medusa";
import { CreateReturnType } from "@medusajs/medusa/dist/types/fulfillment-provider";
import { FULFILLMENT_IDENTIFIERS } from "../utils/enums";

class CustomFulfillmentService extends AbstractFulfillmentService {
    static identifier = FULFILLMENT_IDENTIFIERS.CUSTOM;

    constructor(container: any) {
        super(container);
    }

    async getFulfillmentOptions(): Promise<any[]> {
        return [
            {
                id: FULFILLMENT_IDENTIFIERS.CUSTOM,
            },
        ];
    }

    validateFulfillmentData(
        optionData: { [x: string]: unknown },
        data: { [x: string]: unknown },
        cart: Cart
    ): Promise<Record<string, unknown>> {
        throw new Error("Method not implemented.");
    }

    validateOption(data: Record<string, unknown>): Promise<boolean> {
        console.log(data);
        throw new Error("Validate option error.");
    }

    canCalculate(data: Record<string, unknown>): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    calculatePrice(
        optionData: { [x: string]: unknown },
        data: Record<string, unknown>,
        cart: Cart
    ): Promise<number> {
        throw new Error("Method not implemented.");
    }

    createFulfillment(
        data: Record<string, unknown>,
        items: LineItem[],
        order: Order,
        fulfillment: Fulfillment
    ): Promise<{ [x: string]: unknown }> {
        throw new Error("Method not implemented.");
    }

    cancelFulfillment(fulfillment: { [x: string]: unknown }): Promise<any> {
        throw new Error("Method not implemented.");
    }

    createReturn(
        returnOrder: CreateReturnType
    ): Promise<Record<string, unknown>> {
        throw new Error("Method not implemented.");
    }

    getFulfillmentDocuments(data: { [x: string]: unknown }): Promise<any> {
        throw new Error("Method not implemented.");
    }

    getReturnDocuments(data: Record<string, unknown>): Promise<any> {
        throw new Error("Method not implemented.");
    }

    getShipmentDocuments(data: Record<string, unknown>): Promise<any> {
        throw new Error("Method not implemented.");
    }

    retrieveDocuments(
        fulfillmentData: Record<string, unknown>,
        documentType: "invoice" | "label"
    ): Promise<any> {
        throw new Error("Method not implemented.");
    }
}

export default CustomFulfillmentService;
