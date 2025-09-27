"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ResponsiveTableProps {
  children: React.ReactNode;
  className?: string;
}

interface TableHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface TableRowProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

interface TableCellProps {
  children: React.ReactNode;
  className?: string;
  width?: string;
  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
}

interface TableBodyProps {
  children: React.ReactNode;
  className?: string;
}

interface TableHeadProps {
  children: React.ReactNode;
  className?: string;
  width?: string;
  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
}

export function ResponsiveTable({ children, className }: ResponsiveTableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-full">
        <table className={cn("w-full table-fixed", className)}>
          {children}
        </table>
      </div>
    </div>
  );
}

export function TableHeader({ children, className }: TableHeaderProps) {
  return (
    <thead className={cn("bg-muted/50 dark:bg-muted/30 border-b border-border sticky top-0 z-10", className)}>
      {children}
    </thead>
  );
}

export function TableBody({ children, className }: TableBodyProps) {
  return (
    <tbody className={cn("", className)}>
      {children}
    </tbody>
  );
}

export function TableRow({ children, className, onClick }: TableRowProps) {
  return (
    <tr
      className={cn(
        "border-b border-border hover:bg-muted/50 transition-colors",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </tr>
  );
}

export function TableHead({
  children,
  className,
  width,
  hideOnMobile = false,
  hideOnTablet = false
}: TableHeadProps) {
  const hiddenClasses = cn(
    hideOnMobile && "hidden sm:table-cell",
    hideOnTablet && "hidden md:table-cell"
  );

  return (
    <th
      className={cn(
        "text-left py-3 px-2 md:px-3 lg:px-4 font-medium text-muted-foreground",
        width && `w-[${width}]`,
        hiddenClasses,
        className
      )}
    >
      <div className="truncate">{children}</div>
    </th>
  );
}

export function TableCell({
  children,
  className,
  width,
  hideOnMobile = false,
  hideOnTablet = false
}: TableCellProps) {
  const hiddenClasses = cn(
    hideOnMobile && "hidden sm:table-cell",
    hideOnTablet && "hidden md:table-cell"
  );

  return (
    <td
      className={cn(
        "py-3 px-2 md:px-3 lg:px-4",
        width && `w-[${width}]`,
        hiddenClasses,
        className
      )}
    >
      <div className="min-w-0">{children}</div>
    </td>
  );
}

// Mobile Card Component for responsive design
interface MobileCardProps {
  children: React.ReactNode;
  className?: string;
}

export function MobileCard({ children, className }: MobileCardProps) {
  return (
    <div className={cn("bg-card border border-border rounded-lg p-4 space-y-3", className)}>
      {children}
    </div>
  );
}

interface MobileCardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function MobileCardHeader({ children, className }: MobileCardHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between", className)}>
      {children}
    </div>
  );
}

interface MobileCardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function MobileCardContent({ children, className }: MobileCardContentProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {children}
    </div>
  );
}

interface MobileCardActionsProps {
  children: React.ReactNode;
  className?: string;
}

export function MobileCardActions({ children, className }: MobileCardActionsProps) {
  return (
    <div className={cn("flex items-center justify-end space-x-2", className)}>
      {children}
    </div>
  );
}

// Responsive Container that switches between table and cards
interface ResponsiveTableContainerProps {
  desktopTable: React.ReactNode;
  mobileCards: React.ReactNode;
  breakpoint?: "sm" | "md" | "lg";
}

export function ResponsiveTableContainer({
  desktopTable,
  mobileCards,
  breakpoint = "md"
}: ResponsiveTableContainerProps) {
  const desktopClass = cn(
    breakpoint === "sm" && "hidden sm:block",
    breakpoint === "md" && "hidden md:block",
    breakpoint === "lg" && "hidden lg:block"
  );

  const mobileClass = cn(
    breakpoint === "sm" && "block sm:hidden",
    breakpoint === "md" && "block md:hidden",
    breakpoint === "lg" && "block lg:hidden"
  );

  return (
    <>
      <div className={desktopClass}>
        {desktopTable}
      </div>
      <div className={mobileClass}>
        {mobileCards}
      </div>
    </>
  );
}

// Utility components for common table patterns
interface TableEmptyStateProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  colSpan: number;
}

export function TableEmptyState({ icon: Icon, title, description, colSpan }: TableEmptyStateProps) {
  return (
    <TableRow>
      <TableCell className="py-12 text-center" width={`${colSpan * 100}%`}>
        <Icon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </TableCell>
    </TableRow>
  );
}

interface TableLoadingProps {
  colSpan: number;
  rows?: number;
}

export function TableLoading({ colSpan, rows = 5 }: TableLoadingProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, index) => (
        <TableRow key={index}>
          {Array.from({ length: colSpan }).map((_, cellIndex) => (
            <TableCell key={cellIndex}>
              <div className="h-4 bg-muted animate-pulse rounded" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}
