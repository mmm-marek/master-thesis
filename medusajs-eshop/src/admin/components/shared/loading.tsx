import { Spinner } from "@medusajs/icons";

const Loading = () => {
    return (
        <div className="w-full flex justify-center">
            <Spinner className="animate-spin" />
        </div>
    );
};

export default Loading;
