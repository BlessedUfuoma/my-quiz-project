import React, { useState } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  LayoutDashboard,
  BookOpen,
  HelpCircle,
  ClipboardList,
  BarChart2,
  User,
  Menu,
  X,
} from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = useState(false)

  const navItems = [
    { id: 1, icon: <LayoutDashboard size={24} />, path: "/dashboard", label: "Dashboard" },
    { id: 2, icon: <BookOpen size={24} />, path: "/subject", label: "Subjects" },
    { id: 3, icon: <HelpCircle size={24} />, path: "/quiz", label: "Quiz" },
    { id: 4, icon: <ClipboardList size={24} />, path: "/answer", label: "Answers" },
    { id: 5, icon: <BarChart2 size={24} />, path: "/progress", label: "Progress" },
    { id: 6, icon: <User size={24} />, path: "/profile", label: "Profile" },
  ]

  const renderSidebarContent = () => (
    <div
      className="h-screen w-16 flex flex-col items-center py-6 gap-6
                 bg-gradient-to-b from-[#434799]  to-[#747AF5]"
    >
      {navItems.map((item) => {
        const isActive = location.pathname === item.path
        return (
          <Tooltip key={item.id}>
            <TooltipTrigger asChild>
              <button
                onClick={() => {
                  navigate(item.path)
                  setOpen(false) // Close menu after click on mobile
                }}
                className={`p-2 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-white text-[#1ca7e6]"
                    : "hover:bg-white hover:text-[#1ca7e6] text-white"
                }`}
              >
                {item.icon}
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{item.label}</p>
            </TooltipContent>
          </Tooltip>
        )
      })}
    </div>
  )

  return (
    <TooltipProvider>
      {/* Desktop Sidebar */}
      <div className="hidden md:block">{renderSidebarContent()}</div>

      {/* Mobile Menu Button */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              className="p-2 bg-[#1ca7e6] text-white rounded-lg shadow-md focus:outline-none"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 bg-transparent border-none">
            <SheetHeader className="hidden">
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            {renderSidebarContent()}
          </SheetContent>
        </Sheet>
      </div>
    </TooltipProvider>
  )
}
