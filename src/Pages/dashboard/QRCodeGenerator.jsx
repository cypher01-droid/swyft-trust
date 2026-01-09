import { QRCodeSVG } from 'qrcode.react';

export  function QRCodeGenerator({ value, size = 180 }) {
  return (
    <div className="qr-box" style={{ padding: '15px', background: 'white', borderRadius: '12px', display: 'inline-block' }}>
      <QRCodeSVG
        value={value}
        size={size}
        bgColor={"#ffffff"}
        fgColor={"#0a0a0c"} 
        level={"H"}
        includeMargin={true}
      />
    </div>
  );
}
