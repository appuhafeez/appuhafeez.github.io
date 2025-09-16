import React, { useEffect } from "react";

interface AdProps {
  slot: string; // Your Ad Slot ID
  style?: React.CSSProperties;
}

const AdSense: React.FC<AdProps> = ({ slot, style }) => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Adsense error:", e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={style || { display: "block" }}
      data-ad-client="ca-pub-9460694981409276"  // Replace with your AdSense Publisher ID
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
};

export default AdSense;
