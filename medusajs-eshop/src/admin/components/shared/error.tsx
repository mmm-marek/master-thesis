import { ToolsSolid } from "@medusajs/icons";

const Error = () => {
    return (
        <div className="w-full flex flex-col gap-2 items-center justify-center">
            <ToolsSolid />
            <p className="inter-base-regular">
                Something went wrong. Contact our support team.
            </p>
        </div>
    );
};

export default Error;
