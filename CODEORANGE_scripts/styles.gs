function styles() {
  const attr = DocumentApp.Attribute

  let regular = {};
  regular[attr.BOLD] = false;
  regular[attr.ITALIC] = false;
  let bold = {};
  bold[attr.BOLD] = true;
  let italic = {};
  italic[attr.ITALIC] = true;

  let left = {};
  left[attr.HORIZONTAL_ALIGNMENT] = DocumentApp.HorizontalAlignment.LEFT;
  let right = {};
  right[attr.HORIZONTAL_ALIGNMENT] = DocumentApp.HorizontalAlignment.RIGHT;
  let center = {};
  center[attr.HORIZONTAL_ALIGNMENT] = DocumentApp.HorizontalAlignment.CENTER;

  let qrImage = {};
  qrImage[attr.HEIGHT] = 200;
  qrImage[attr.WIDTH] = 200;
  let noBorder = {}
  noBorder[attr.BORDER_COLOR] = '#FFFFFF';
  noBorder[attr.BORDER_WIDTH] = 0;

  let normal = {};
  normal[attr.HEADING] = DocumentApp.ParagraphHeading.NORMAL;
  let title = {};
  title[attr.HEADING] = DocumentApp.ParagraphHeading.TITLE;
  let subtitle = {};
  subtitle[attr.HEADING] = DocumentApp.ParagraphHeading.SUBTITLE;
  let heading1 = {};
  heading1[attr.HEADING] = DocumentApp.ParagraphHeading.HEADING1;
  heading1[attr.FONT_SIZE] = DocumentApp.FONT_SIZE = 12
  let heading2 = {};
  heading2[attr.HEADING] = DocumentApp.ParagraphHeading.HEADING2;
  let heading3 = {};
  heading3[attr.HEADING] = DocumentApp.ParagraphHeading.HEADING3;
  let heading4 = {};
  heading4[attr.HEADING] = DocumentApp.ParagraphHeading.HEADING4;

  let anIndent = {};
  anIndent[attr.INDENT_START] = 50; 

  let bullet1 = {};
  bullet1[attr.NESTING_LEVEL] = 1;
  let ordered = {};
  
  const theStyles = {regular: regular, bold: bold, italic: italic, left: left, right: right, center: center, qrImage: qrImage, normal: normal, title: title, heading1: heading1, heading2: heading2, heading3: heading3, heading4: heading4, bullet1: bullet1, ordered: ordered, noborder: noBorder};
  return theStyles;
}