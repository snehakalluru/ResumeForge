declare module 'html2pdf.js' {
  interface Worker { set(options:Record<string,unknown>):Worker; from(source:HTMLElement):Worker; save():Promise<void> }
  const html2pdf:()=>Worker
  export default html2pdf
}
