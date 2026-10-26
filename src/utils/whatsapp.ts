import { CartItem, Product, OrderFormState, CustomShoeRequest } from '../types/footwear';

// Bàtà Official WhatsApp number for orders
export const BATA_WHATSAPP_NUMBER = '2348123456789'; // format without + for wa.me
export const BATA_DISPLAY_PHONE = '+234 812 345 6789';

export const DELIVERY_FEES: Record<string, { label: string; standard: number; express: number }> = {
  'Lagos Mainland': { label: 'Lagos Mainland', standard: 2500, express: 4000 },
  'Lagos Island / Lekki': { label: 'Lagos Island / Lekki', standard: 3000, express: 4500 },
  'Abuja (FCT)': { label: 'Abuja (FCT)', standard: 4500, express: 6500 },
  'Rivers (Port Harcourt)': { label: 'Rivers (Port Harcourt)', standard: 4500, express: 6500 },
  'Oyo (Ibadan)': { label: 'Oyo (Ibadan)', standard: 3500, express: 5000 },
  'Ogun (Abeokuta)': { label: 'Ogun (Abeokuta)', standard: 3500, express: 5000 },
  'Enugu / South East': { label: 'Enugu / South East', standard: 4500, express: 6500 },
  'Kano / Northern States': { label: 'Kano / Northern States', standard: 5000, express: 7000 },
  'Other States in Nigeria': { label: 'Other States in Nigeria', standard: 4500, express: 6500 },
};

export function formatNaira(amount: number): string {
  return '₦' + amount.toLocaleString('en-NG');
}

/**
 * Generate WhatsApp message URL for a single quick order
 */
export function generateSingleProductWhatsAppUrl(
  product: Product,
  size: number,
  color: string,
  quantity: number = 1,
  customerName?: string,
  customerPhone?: string,
  deliveryLocation?: string
): string {
  const totalPrice = product.price * quantity;
  
  const lines: string[] = [
    `Hello Bàtà! 👞`,
    `I would like to order this footwear from your website:`,
    ``,
    `• Item: ${product.name}`,
    `• Category: ${product.categoryLabel}`,
    `• Size: EU ${size} (UK ${size - 33})`,
    `• Color: ${color}`,
    `• Quantity: ${quantity}`,
    `• Price: ${formatNaira(totalPrice)}`,
  ];

  if (customerName) lines.push(`• Customer Name: ${customerName}`);
  if (customerPhone) lines.push(`• Phone Number: ${customerPhone}`);
  if (deliveryLocation) lines.push(`• Delivery Town/State: ${deliveryLocation}`);

  lines.push(``);
  lines.push(`Please confirm if this is available so I can proceed with payment and delivery. Thank you!`);

  const text = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${BATA_WHATSAPP_NUMBER}?text=${text}`;
}

/**
 * Generate WhatsApp message URL for the entire cart checkout
 */
export function generateCartWhatsAppUrl(
  items: CartItem[],
  form: OrderFormState,
  deliveryFee: number,
  totalAmount: number
): string {
  const lines: string[] = [
    `Hello Bàtà! 👞`,
    `I want to place an order from your website:`,
    ``,
    `ORDER SUMMARY:`,
  ];

  items.forEach((item, index) => {
    lines.push(
      `${index + 1}. ${item.product.name} (EU ${item.selectedSize}, ${item.selectedColor}) x${item.quantity} — ${formatNaira(item.product.price * item.quantity)}`
    );
  });

  lines.push(``);
  const itemsSubtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  lines.push(`• Items Subtotal: ${formatNaira(itemsSubtotal)}`);
  lines.push(`• Delivery (${form.deliveryState} - ${form.deliveryOption.toUpperCase()}): ${formatNaira(deliveryFee)}`);
  lines.push(`• TOTAL PAYABLE: ${formatNaira(totalAmount)}`);
  lines.push(``);
  lines.push(`CUSTOMER & DELIVERY DETAILS:`);
  lines.push(`• Full Name: ${form.customerName}`);
  lines.push(`• Phone: ${form.customerPhone}`);
  lines.push(`• Delivery Address: ${form.deliveryAddress}, ${form.deliveryState}`);
  if (form.orderNotes) {
    lines.push(`• Note: ${form.orderNotes}`);
  }
  lines.push(``);
  lines.push(`Please send me payment account details to confirm this order. Thank you!`);

  const text = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${BATA_WHATSAPP_NUMBER}?text=${text}`;
}

/**
 * Generate WhatsApp URL for custom footwear inquiry ("Make For Me")
 */
export function generateCustomShoeWhatsAppUrl(request: CustomShoeRequest): string {
  const lines: string[] = [
    `Hello Bàtà Workshop! 👞`,
    `I want you to make a custom shoe for me:`,
    ``,
    `• Footwear Style: ${request.shoeType}`,
    `• Preferred Leather Color: ${request.leatherColor}`,
    `• My Shoe Size: EU ${request.footSize}`,
    `• Special Instructions: ${request.specialInstructions || 'Standard high quality finish'}`,
    ``,
    `CUSTOMER DETAILS:`,
    `• Name: ${request.customerName}`,
    `• Phone: ${request.customerPhone}`,
    `• My Location: ${request.deliveryLocation}`,
    ``,
    `I will also send you the sample photo here in chat. How much will it cost and how many days to finish it?`,
  ];

  const text = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${BATA_WHATSAPP_NUMBER}?text=${text}`;
}

/**
 * Direct general inquiry WhatsApp URL
 */
export function generateGeneralInquiryWhatsAppUrl(topic?: string): string {
  const msg = topic 
    ? `Hello Bàtà! I have a question about ${topic}. Can you help me?`
    : `Hello Bàtà! I am browsing your footwear website and would like to ask a question.`;
  return `https://wa.me/${BATA_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}
