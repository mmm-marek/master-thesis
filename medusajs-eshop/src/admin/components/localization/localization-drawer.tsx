import { ReactNode } from "react";
import { Button, Drawer } from "@medusajs/ui";

type LocalizationDrawerProps = {
    title: string;
    subtitle: string;
    triggerText: string;
    form: ReactNode;
};

const LocalizationDrawer = ({
    title,
    subtitle,
    triggerText,
    form,
}: LocalizationDrawerProps) => {
    return (
        <Drawer>
            <Drawer.Trigger asChild>
                <Button className="inter-large-semibold">{triggerText}</Button>
            </Drawer.Trigger>
            <Drawer.Content className="w-[700px] right-0">
                <Drawer.Header>
                    <Drawer.Title>
                        <h2 className="inter-large-semibold">{title}</h2>
                        <p className="inter-base-regular">{subtitle}</p>
                    </Drawer.Title>
                </Drawer.Header>
                <Drawer.Body className="overflow-auto">{form}</Drawer.Body>
                <Drawer.Footer>
                    <Drawer.Close asChild>
                        <Button variant="secondary">Close</Button>
                    </Drawer.Close>
                </Drawer.Footer>
            </Drawer.Content>
        </Drawer>
    );
};

export default LocalizationDrawer;
