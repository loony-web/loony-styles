import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "../badge/badge.js";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./table.js";

const meta = {
  title: "Display/Table",
  component: Table,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const invoices = [
  { id: "INV-001", paymentStatus: "Paid", totalAmount: "$250.00", paymentMethod: "Credit Card" },
  { id: "INV-002", paymentStatus: "Pending", totalAmount: "$150.00", paymentMethod: "PayPal" },
  { id: "INV-003", paymentStatus: "Unpaid", totalAmount: "$350.00", paymentMethod: "Bank Transfer" },
  { id: "INV-004", paymentStatus: "Paid", totalAmount: "$450.00", paymentMethod: "Credit Card" },
  { id: "INV-005", paymentStatus: "Paid", totalAmount: "$550.00", paymentMethod: "PayPal" },
];

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.id}</TableCell>
            <TableCell>
              <Badge
                variant={
                  invoice.paymentStatus === "Paid"
                    ? "success-subtle"
                    : invoice.paymentStatus === "Pending"
                    ? "warning-subtle"
                    : "danger-subtle"
                }
              >
                {invoice.paymentStatus}
              </Badge>
            </TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$1,750.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};
