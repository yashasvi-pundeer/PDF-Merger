const PDFMerger = require('pdf-merger-js');               // including pdf merger utility

var merger = new PDFMerger();

const mergePdfs=async (p1,p2) => {
  await merger.add(p1);  //merge all pages. parameter is the path to file and filename.
  await merger.add(p2); 
  await merger.save('public/merged.pdf'); //save under given name and reset the internal document
};

module.exports={mergePdfs}      //exporting merge func as obj 