// src/lib/exportPDF.ts
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Transaction } from '@/service/transaction';
import { ExchangeGoal } from '@/service/exchangeGoal';

export const generateTransactionsPDF = (
  transactions: Transaction[],
  goals: ExchangeGoal[],
  t: (key: string) => string,
  language: string
) => {
  try {
    const doc = new jsPDF();
    const userName = localStorage.getItem('userName') || 'Usuário';

    // Paleta de Cores Premium (Baseado no Tailwind)
    const brandColor: [number, number, number] = [5, 150, 105]; // Emerald 600
    const textDark: [number, number, number] = [15, 23, 42]; // Slate 900
    const textLight: [number, number, number] = [100, 116, 139]; // Slate 500
    const lineGray: [number, number, number] = [226, 232, 240]; // Slate 200

    // Formatadores Seguros
    const dateObj = new Date();
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    const hour = String(dateObj.getHours()).padStart(2, '0');
    const min = String(dateObj.getMinutes()).padStart(2, '0');
    
    const isEnglish = language === 'en';
    const displayDate = isEnglish ? `${month}/${day}/${year}` : `${day}/${month}/${year}`;
    const safeDateName = `${day}-${month}-${year}`;

    // --- CABEÇALHO ---
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(...brandColor);
    doc.text('FinancialPlan', 14, 22);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...textLight);
    doc.text('Extrato de Movimentações Financeiras', 14, 28);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...textDark);
    doc.text(`Titular:`, 196, 22, { align: 'right' });
    doc.setFont("helvetica", "normal");
    doc.text(userName, 196, 28, { align: 'right' });

    doc.setFont("helvetica", "bold");
    doc.text(`Emissão:`, 196, 36, { align: 'right' });
    doc.setFont("helvetica", "normal");
    doc.text(`${displayDate} às ${hour}:${min}`, 196, 42, { align: 'right' });

    // --- LINHA DIVISÓRIA ---
    doc.setDrawColor(...lineGray);
    doc.setLineWidth(0.5);
    doc.line(14, 48, 196, 48);

    // --- BOX DE RESUMO GLOBAL ---
    const totalBRL = transactions.reduce((acc, curr) => acc + Number(curr.amount_brl), 0);
    const formattedTotal = totalBRL.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    
    doc.setFillColor(248, 250, 252); 
    doc.setDrawColor(...lineGray);
    doc.roundedRect(14, 55, 182, 28, 3, 3, 'FD'); 

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...textDark);
    doc.text('Resumo da Conta', 20, 65);

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...textLight);
    doc.text('Total de lançamentos registrados no período', 20, 72);
    doc.text('Total Acumulado (BRL)', 190, 65, { align: 'right' });

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...brandColor);
    doc.text(`R$ ${formattedTotal}`, 190, 73, { align: 'right' });

    doc.setFontSize(12);
    doc.setTextColor(...textDark);
    doc.text(`${transactions.length}`, 84, 72);

    // --- TABELA DE TRANSAÇÕES ---
    const tableColumn = ["Data", "Descrição", "Destino", "Categoria", "Via", "Taxa", "Estrangeiro", "Total (BRL)"];
    const tableRows: string[][] = [];

    const sortedTransactions = [...transactions].reverse();

    sortedTransactions.forEach(tx => {
      const goal = goals.find(g => g.id_exchange_goal === tx.id_exchange_goal);
      const destinationName = goal ? goal.destination : 'N/A';
      const currency = goal ? goal.target_currency : '$';
      
      let txDateStr = displayDate;
      if (tx.created_at) {
        const d = new Date(tx.created_at);
        const dDay = String(d.getDate()).padStart(2, '0');
        const dMonth = String(d.getMonth() + 1).padStart(2, '0');
        const dYear = d.getFullYear();
        txDateStr = isEnglish ? `${dMonth}/${dDay}/${dYear}` : `${dDay}/${dMonth}/${dYear}`;
      }

      const rateStr = Number(tx.exchange_rate || 0).toFixed(2).replace('.', ',');
      const valForeignStr = Number(tx.amount_foreign || 0).toFixed(2).replace('.', ',');
      const valBRLStr = Number(tx.amount_brl || 0).toFixed(2).replace('.', ',');

      const rowData = [
        txDateStr,
        tx.description || '-',
        destinationName,
        tx.category || 'Outros',
        tx.platform || '-',
        rateStr,
        `${currency} ${valForeignStr}`,
        `R$ ${valBRLStr}`
      ];
      tableRows.push(rowData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 92,
      theme: 'plain', 
      headStyles: { 
        fillColor: [241, 245, 249], 
        textColor: textDark, 
        fontStyle: 'bold',
        fontSize: 8,
        cellPadding: 5,
      },
      bodyStyles: {
        fontSize: 8,
        cellPadding: 5,
        textColor: textLight,
        // CORREÇÃO: Usando a tipagem oficial do jsPDF-AutoTable
        lineColor: lineGray,
        lineWidth: 0.1,
      },
      columnStyles: {
        0: { cellWidth: 20 },
        5: { halign: 'right' }, 
        6: { halign: 'right' }, 
        7: { halign: 'right', fontStyle: 'bold', textColor: textDark }, 
      },
    });

    // --- RODAPÉ OFICIAL ---
    // CORREÇÃO: Extraímos apenas a função getNumberOfPages, mantendo o pageSize original
    type InternalDoc = { internal: { getNumberOfPages: () => number } };
    const pageCount = (doc as unknown as InternalDoc).internal.getNumberOfPages();
    
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      
      doc.setDrawColor(...lineGray);
      doc.setLineWidth(0.5);
      doc.line(14, doc.internal.pageSize.getHeight() - 20, 196, doc.internal.pageSize.getHeight() - 20);

      doc.setFontSize(7);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...textLight);
      
      doc.text(
        'Este documento é um extrato informativo gerado automaticamente pelo sistema FinancialPlan.',
        14,
        doc.internal.pageSize.getHeight() - 14
      );
      
      doc.text(
        `Página ${i} de ${pageCount}`,
        196,
        doc.internal.pageSize.getHeight() - 14,
        { align: 'right' }
      );
    }

    doc.save(`FinancialPlan_Extrato_${safeDateName}.pdf`);
    
  } catch (error) {
    console.error("Erro ao gerar PDF:", error);
    alert("Ocorreu um erro interno na geração do documento.");
  }
};