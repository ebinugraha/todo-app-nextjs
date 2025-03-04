import { Navbar } from "@/components/ui/navbar"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <>
            <Navbar/>
            <main className="py-10">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 h-full py-2.5">
                        {children}
                </div>
            </main>
        </>
    )

}

export default DashboardLayout