import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../../assets/Fina.logo.png'
import axios from "axios";


const FinaPaymentReports = () => {

  const [pdfData, setpdfData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    axios.get("http://localhost:8080/api/payment")
      .then((response) => {
        console.log(response);
        setpdfData(response.data);
      })
      .catch((error) => setIsError(error.message))
      .finally(() => setIsLoading(false));
  }, []);





  const generatePDF = () => {
    const doc = new jsPDF('landscape', 'px', 'a4', false);

    if (pdfData.length > 0) {
      const headers = ['Customer Name', 'Pet ID', 'Payment', 'Status'];
      const rows = pdfData.map((payment) => {
        const paymentStr = String(payment.payment);
        return [payment.cus_id, payment.pet_id, paymentStr, payment.status];
      });

      
      doc.addImage(name, 'JPG', 65, 20, 100, 100);

    
      doc.setFontSize(18);
      doc.setFont('times', 'bold'); 
      const textWidth = doc.getStringUnitWidth('CUSTOMER PAYMENTS') * doc.internal.getFontSize() / doc.internal.scaleFactor;
      const textOffset = (doc.internal.pageSize.width - textWidth) / 2;
      doc.text('CUSTOMER PAYMENTS', textOffset, 120);

      
      doc.autoTable({
        head: [headers],
        body: rows,
        startY: 140,
      });

      doc.save('PaymentReports.pdf');
    }
  };

  return (
    <div className=" py-20" style={{ textAlign: 'center' }}>
      <button onClick={generatePDF}>Download pdf</button>
    </div>
  );
};

export default FinaPaymentReports;
