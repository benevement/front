// composant générique qui permet de "purifier" le code HTML contrre d'éventuelles attaques type XSS
// le module est chargé entre les balises <head></head> du fichier index.html (lien vers cdn)
// possibilité d'install via npm : dompurify et @tailwindplus/elements

// composant enfant : on lui transmet un boc HTML (string) dans ses props => sanitize => render

declare global {
    interface Window {
      DOMPurify: any;
    }
  }
  
  type Props = { html: string };

export default function InfoBox({ html }: Props) {
    const safeHtml = window.DOMPurify.sanitize(html);
  
    return (
      <div
        className="info-box"
        //dangerouslySetInnerHTML={{ __html: safeHtml }}
        dangerouslySetInnerHTML={{__html: html}}
      />
    );
  }
  

  