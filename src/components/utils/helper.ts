export function digitsEnToFa(input: number | string): string {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return input
    .toString()
    .split("")
    .map((char) =>
      /[0-9]/.test(char) ? persianDigits[parseInt(char, 10)] : char
    )
    .join("");
}

export const formatPrice = (price: number) => {
  return digitsEnToFa(price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
};

// Function to translate tone to Persian
export const translateTone = (tone: string) => {
  const toneMap: { [key: string]: string } = {
    "Fresh & Aquatic": "تازه و آبی",
    "Woody & Spicy": "چوبی و تند",
    "Floral & Fresh": "گلی و تازه",
    "Sweet & Oriental": "شیرین و شرقی",
    "Warm & Spicy": "گرم و تند",
    "Citrus & Fresh": "مرکبات و تازه",
    "Floral & Woody": "گلی و چوبی",
    "Woody & Aromatic": "چوبی و معطر",
    "Spicy & Woody": "تند و چوبی",
    "Floral & Fruity": "گلی و میوه‌ای",
    "Citrus & Floral": "مرکبات و گلی",
    "Oriental & Woody": "شرقی و چوبی",
    "Fresh & Spicy": "تازه و تند",
    "Woody & Fresh": "چوبی و تازه",
    "Floral & Oriental": "گلی و شرقی",
    "Aromatic & Fresh": "معطر و تازه",
    "Woody & Oriental": "چوبی و شرقی",
    "Fresh & Woody": "تازه و چوبی",
    "Spicy & Oriental": "تند و شرقی",
    "Oriental & Spicy": "شرقی و تند",
    "Cool & Bitter": "خنک و تلخ",
    "Fresh & Aromatic": "تازه و معطر",
    "Warm & Sweet": "گرم و شیرین",
    "Fresh & Sweet": "تازه و شیرین",
    "Fresh & Fruity": "تازه و میوه‌ای",
    "Fresh & Citrusy": "تازه و مرکبات",
    "Fresh & Citrus": "تازه و مرکبات",
    "Warm & Woody": "گرم و چوبی",
    "Cool & Fresh": "خنک و تازه",
    "Sweet & Fruity": "شیرین و میوه‌ای",
    "Spicy & Sweet": "تند و شیرین",
    "Woody & Sweet": "چوبی و شیرین",
    "Fresh & Green": "تازه و سبز",
    "Warm & Oriental": "گرم و شرقی",
    "Cool & Aquatic": "خنک و آبی",
    "Floral & Sweet": "گلی و شیرین",
    "Aromatic & Spicy": "معطر و تند",
    "Oriental & Sweet": "شرقی و شیرین",
  };
  return toneMap[tone] || tone;
};

// Function to translate scent family to Persian
export const translateScentFamily = (scentFamily: string) => {
  const scentFamilyMap: { [key: string]: string } = {
    "Aromatic Aquatic": "معطر آبی",
    "Woody Spicy": "چوبی تند",
    Floral: "گلی",
    "Oriental Woody": "شرقی چوبی",
    "Amber Vanilla": "کهربا وانیل",
    "Woody Aromatic": "چوبی معطر",
    "Floral Woody": "گلی چوبی",
    "Oriental Spicy": "شرقی تند",
    "Citrus Aromatic": "مرکبات معطر",
    "Floral Fruity": "گلی میوه‌ای",
    "Woody Oriental": "چوبی شرقی",
    "Amber Spicy": "کهربا تند",
    "Citrus Floral": "مرکبات گلی",
    "Oriental Floral": "شرقی گلی",
    "Aromatic Fresh": "معطر تازه",
    "Woody Fresh": "چوبی تازه",
    "Spicy Oriental": "تند شرقی",
    "Fresh Oriental": "تازه شرقی",
    "Floral Oriental": "گلی شرقی",
    "Aromatic Woody": "معطر چوبی",
    "Fresh Aquatic": "تازه آبی",
    "Warm Spicy": "گرم تند",
    "Cool Fresh": "خنک تازه",
    "Sweet Oriental": "شیرین شرقی",
    "Floral Spicy": "گلی تند",
    "Oriental Fresh": "شرقی تازه",
    "Aromatic Oriental": "معطر شرقی",
    "Fresh Woody": "تازه چوبی",
    "Spicy Fresh": "تند تازه",
  };
  return scentFamilyMap[scentFamily] || scentFamily;
};
