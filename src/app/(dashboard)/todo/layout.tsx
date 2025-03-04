export default function TodoLayout({children} : {children: React.ReactNode}) {
    return (
        <div className="h-[80vh]"> 
            {children}
        </div>
    )
}