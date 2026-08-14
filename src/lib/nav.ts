import {
  BarChart3,
  BookOpen,
  Gamepad2,
  HeartHandshake,
  Home,
  type LucideIcon,
} from "lucide-react"

export interface NavItem {
  to: string
  label: string
  icon: LucideIcon
}

export const navItems: NavItem[] = [
  { to: "/", label: "首页", icon: Home },
  { to: "/library", label: "汉字库", icon: BookOpen },
  { to: "/games", label: "玩游戏", icon: Gamepad2 },
  { to: "/progress", label: "学习进度", icon: BarChart3 },
  { to: "/guide", label: "家长指南", icon: HeartHandshake },
]
