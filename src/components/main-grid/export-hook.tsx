import { type TableColumnType } from "antd";
import objectPath from "object-path";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
// @ts-ignore
import xlsx from "better-xlsx";

// modified code from https://github.com/emirmuminoglu/antd-export-table/blob/master/src/index.ts

interface exportData<RecordType extends object> {
    columns: TableColumnType<RecordType>[];
    data: RecordType[];
    fileName: string;
}

const useExport = <RecordType extends object>({ columns, data, fileName }: exportData<RecordType>) => {

    const onExcelPrint = () => {
        const file = new xlsx.File();
        const sheet = file.addSheet("Sheet1");
        const headerRow = sheet.addRow();

        columns.forEach(({ title }) => {
            if (title === 'Action') return;
            const cell = headerRow.addCell();
            cell.value = title;
        });

        data.forEach((record) => {
            const row = sheet.addRow();
            // @ts-ignore
            record.date = new Date(record.date).toLocaleDateString() ;
            columns.forEach(({ dataIndex }) => {
                if (dataIndex === 'Action') return;
                const cell = row.addCell();
                cell.value = objectPath.get(record, dataIndex as objectPath.Path);
            });
        });

        file.saveAs('blob').then((blob: Blob) => {
            saveAs(blob, `${fileName}.xlsx`);
        })
    };

    const onPdfPrint = () => {
        const doc = new jsPDF();
        doc.setFont('FreeSans');
        // @ts-ignore
        data.forEach(item => item.date = new Date(item.date).toLocaleDateString()) 
        autoTable(doc, {
            styles: { font: "FreeSans" },
            headStyles: { fontStyle: 'normal' },
            head: [columns.filter(c => c.title !== 'Action').map(c => typeof c.title === 'string' ? c.title : (c.title ? String(c.title) : ''))],
            body: data.map(r => columns.filter(c => c.dataIndex !== 'Action').map(c => objectPath.get(r, c.dataIndex as objectPath.Path))),
        })

        doc.save(`${fileName}.pdf`);
    }

  return {onExcelPrint, onPdfPrint};

};

export default useExport;