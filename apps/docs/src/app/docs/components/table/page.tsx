import { ComponentDoc, ComponentPreview, PackageInstall, Section, CodeBlock } from "@/components/component-doc";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell, TableCaption, Badge } from "@loony/ui";

export default function TablePage() {
  return (
    <ComponentDoc
      name="Table"
      description="A responsive table component for displaying structured data."
      toc={[
        { id: "installation", label: "Installation" },
        { id: "usage", label: "Usage" },
        { id: "with-badge", label: "With badges" },
        { id: "api", label: "API Reference" },
      ]}
    >
      <Section id="installation" title="Installation">
        <PackageInstall />
      </Section>

      <Section id="usage" title="Usage">
        <CodeBlock>{`import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@loony/ui";`}</CodeBlock>
        <ComponentPreview
          code={`<Table>
  <TableCaption>A list of recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">INV-001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-medium">INV-002</TableCell>
      <TableCell>Pending</TableCell>
      <TableCell>PayPal</TableCell>
      <TableCell className="text-right">$150.00</TableCell>
    </TableRow>
  </TableBody>
</Table>`}
        >
          <div className="w-full max-w-xl">
            <Table>
              <TableCaption>A list of recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">INV-001</TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">INV-002</TableCell>
                  <TableCell>Pending</TableCell>
                  <TableCell>PayPal</TableCell>
                  <TableCell className="text-right">$150.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">INV-003</TableCell>
                  <TableCell>Unpaid</TableCell>
                  <TableCell>Bank Transfer</TableCell>
                  <TableCell className="text-right">$350.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </ComponentPreview>
      </Section>

      <Section id="with-badge" title="With badges">
        <ComponentPreview
          code={`<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Role</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Alice Johnson</TableCell>
      <TableCell><Badge variant="success-subtle">Active</Badge></TableCell>
      <TableCell>Admin</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Bob Smith</TableCell>
      <TableCell><Badge variant="warning-subtle">Pending</Badge></TableCell>
      <TableCell>Editor</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Carol Williams</TableCell>
      <TableCell><Badge variant="neutral">Inactive</Badge></TableCell>
      <TableCell>Viewer</TableCell>
    </TableRow>
  </TableBody>
</Table>`}
        >
          <div className="w-full max-w-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Alice Johnson</TableCell>
                  <TableCell><Badge variant="success-subtle">Active</Badge></TableCell>
                  <TableCell>Admin</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Bob Smith</TableCell>
                  <TableCell><Badge variant="warning-subtle">Pending</Badge></TableCell>
                  <TableCell>Editor</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Carol Williams</TableCell>
                  <TableCell><Badge variant="neutral">Inactive</Badge></TableCell>
                  <TableCell>Viewer</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </ComponentPreview>
      </Section>
    </ComponentDoc>
  );
}
