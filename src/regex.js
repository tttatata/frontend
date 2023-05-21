export const validEmail = new RegExp(
    '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
);
export const validcccd = new RegExp(
    '^[1-9]\d{0,11}$'
);
export const validsdt = new RegExp(
    '^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$'
);
export const validprice = new RegExp(
    '^[0-9][0-9,]*[0-9]$'
);
export const validroom = new RegExp(
    '^[R][M]+[0-9]{1,2}.+[0-9]{2}$'
);