// <!-- Include this script tag or install `@tailwindplus/elements` via npm: -->
//<!-- <script src="https://cdn.jsdelivr.net/npm/@tailwindplus/elements@1" type="module"></script> -->

import InfoBox from "./InfoBox";
import { useEffect, useState } from "react";


const html4 = `
<div style="display: flex; justify-content: center; align-items: center; backgroud: rgba(155,200,100,0.8)">
<div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica Neue,Arial;margin:auto;
display:flex;align-items:center;justify-content:center;background:#f4f6f8">

<div id="overlay" style="position:fixed;inset:0;background:rgba(0,0,0,0.5);align-items:center;justify-content:center;">
<div style="background:#fff;max-width:420px;width:90%;padding:20px;border-radius:12px;box-shadow:0 8px 30px rgba(18,35,68,0.12)">
<h2 style="margin:0 0 8px;font-size:18px">Information importante</h2>
<p style="margin:0 0 16px;color:#13a135; font-size: 1.8em;">Enregistrement confirmé.</p>
<div style="display:flex;justify-content:flex-end">
<img src="../public/images/success.png" width="50%" alt="YES !">
<!-- <button id="closeBtn" style="background:#e6e9ee;border:none;padding:8px 12px;border-radius:8px;cursor:pointer">Fermer</button> -->
</div>
</div>
</div>
</div>
</div>`

function Dialog_success() {

  const [timeIsOK, setTimeIsOK] = useState<boolean>(true);

  async function timer(ms: number) {
    setTimeout(() => (setTimeIsOK(false)), ms)
  }

  useEffect(() => {
    timer(2000);
    // action avant démontage / ré-exécution du hook
    return () => {
      setTimeIsOK(true);
    }
  }, [])

  return (
    <>
      <div>
        {timeIsOK && <InfoBox html={html4} />}
      </div>
    </>
  )
}
export default Dialog_success;