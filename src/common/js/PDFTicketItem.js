const PDFTicketItem = ((option) => {
  PDFTicketItem.prototype.init(option);
});
PDFTicketItem.prototype = {
  constructor: PDFTicketItem,
  init: (option) => {
    this.itemText = option.itemText;
    this.x = option.x;
    this.y = option.y;
    this.font = option.font;
  },
  draw: (context, fontColor) => {
    context.font = this.font;
    context.fillStyle = fontColor ? fontColor : '#333333';
    context.fillText(this.itemText, this.x, this.y);
  },
  drawTextChangeLine: (context, fontColor, maxWidth) => {
    var chr = this.itemText.split("");
    var temp = "";
    var row = [];

    context.font = this.font;
    context.fillStyle = fontColor ? fontColor : '#333333';

    for(var a = 0; a < chr.length; a++){
        if( context.measureText(temp).width < maxWidth ){
            ;
        }
        else{
            row.push(temp);
            temp = "";
        }
        temp += chr[a];
    }

    row.push(temp);

    for(var b = 0; b < row.length; b++){
        context.fillText(row[b], this.x, this.y + b * 60);
    }
  },
};

export default PDFTicketItem;
