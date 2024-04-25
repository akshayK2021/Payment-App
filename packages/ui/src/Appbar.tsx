import { Button } from "./button";

interface AppbarProps {
    user?: {
        name?: string | null;
    },
    // TODO: can u figure out what the type should be here?
    onSignin: any,
    onSignout: any
}

export const Appbar = ({
    user,
    onSignin,
    onSignout
}: AppbarProps) => {
    return <div className="flex justify-between border-b px-4">
        <div className="text-lg flex flex-col justify-center">
            PayTM
        </div>
       
        <div className="flex flex-row gap-4 justify-center pt-2 items-center">
        <div className="font-bold text-xl ">{user?`${user.name}`:""}</div>
            <Button onClick={user ? onSignout : onSignin}>{user ? "Logout " : "Login"}</Button>
        </div>
    </div>
}