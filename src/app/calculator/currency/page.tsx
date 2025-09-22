'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface ExchangeRates {
  [key: string]: number;
}

export default function CurrencyCalculator() {
  const [amount, setAmount] = useState<string>('');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [result, setResult] = useState<string>('');
  const [rate, setRate] = useState<string>('');
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  // Fallback static rates (backup if API fails)
  const fallbackRates: ExchangeRates = {
    USD: 1,
    EUR: 0.85,
    GBP: 0.73,
    JPY: 110,
    CAD: 1.25,
    AUD: 1.35,
    CHF: 0.92,
    CNY: 6.45,
    INR: 75,
    BRL: 5.2,
    BDT: 110
  };

  // Fetch real-time exchange rates
  const fetchExchangeRates = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      const data = await response.json();
      
      if (data && data.rates) {
        setExchangeRates({ USD: 1, ...data.rates });
        setLastUpdated(new Date().toLocaleString());
      } else {
        // Use fallback rates if API response is invalid
        setExchangeRates(fallbackRates);
        setLastUpdated('Using fallback rates');
      }
    } catch (error) {
      console.error('Failed to fetch exchange rates:', error);
      // Use fallback rates if API fails
      setExchangeRates(fallbackRates);
      setLastUpdated('Using fallback rates');
    } finally {
      setIsLoading(false);
    }
  };

  // Load rates on component mount
  useEffect(() => {
    fetchExchangeRates();
  }, []);

  const calculateCurrency = (): void => {
    const amt = parseFloat(amount);
    const customRate = parseFloat(rate);

    if (isNaN(amt)) {
      alert('Please enter a valid amount');
      return;
    }

    let calculatedResult: number;

    if (customRate && customRate > 0) {
      calculatedResult = amt * customRate;
    } else {
      const fromRate = exchangeRates[fromCurrency];
      const toRate = exchangeRates[toCurrency];
      
      if (!fromRate || !toRate) {
        alert('Currency not supported');
        return;
      }
      
      calculatedResult = (amt / fromRate) * toRate;
    }

    setResult(calculatedResult.toFixed(2));
  };

  const clear = (): void => {
    setAmount('');
    setRate('');
    setResult('');
  };

  // Get available currencies (use fallback if rates not loaded)
  const currencies = Object.keys(exchangeRates).length > 0 
    ? Object.keys(exchangeRates).sort() 
    : Object.keys(fallbackRates).sort();
  
  const currencyNames: { [key: string]: string } = {
    USD: 'USD (United States)',
    EUR: 'EUR (European Union)',
    GBP: 'GBP (United Kingdom)',
    JPY: 'JPY (Japan)',
    CAD: 'CAD (Canada)',
    AUD: 'AUD (Australia)',
    CHF: 'CHF (Switzerland)',
    CNY: 'CNY (China)',
    INR: 'INR (India)',
    BRL: 'BRL (Brazil)',
    BDT: 'BDT (Bangladesh)',
    // Add more common currencies
    AED: 'AED (UAE Dirham)',
    AFN: 'AFN (Afghan Afghani)',
    ALL: 'ALL (Albanian Lek)',
    AMD: 'AMD (Armenian Dram)',
    ANG: 'ANG (Netherlands Antillean Guilder)',
    AOA: 'AOA (Angolan Kwanza)',
    ARS: 'ARS (Argentine Peso)',
    AWG: 'AWG (Aruban Florin)',
    AZN: 'AZN (Azerbaijani Manat)',
    BAM: 'BAM (Bosnia-Herzegovina Convertible Mark)',
    BBD: 'BBD (Barbadian Dollar)',
    BGN: 'BGN (Bulgarian Lev)',
    BHD: 'BHD (Bahraini Dinar)',
    BIF: 'BIF (Burundian Franc)',
    BMD: 'BMD (Bermudian Dollar)',
    BND: 'BND (Brunei Dollar)',
    BOB: 'BOB (Bolivian Boliviano)',
    BSD: 'BSD (Bahamian Dollar)',
    BTN: 'BTN (Bhutanese Ngultrum)',
    BWP: 'BWP (Botswanan Pula)',
    BYN: 'BYN (Belarusian Ruble)',
    BZD: 'BZD (Belize Dollar)',
    CDF: 'CDF (Congolese Franc)',
    CLP: 'CLP (Chilean Peso)',
    COP: 'COP (Colombian Peso)',
    CRC: 'CRC (Costa Rican Colón)',
    CUC: 'CUC (Cuban Convertible Peso)',
    CUP: 'CUP (Cuban Peso)',
    CVE: 'CVE (Cape Verdean Escudo)',
    CZK: 'CZK (Czech Republic Koruna)',
    DJF: 'DJF (Djiboutian Franc)',
    DKK: 'DKK (Danish Krone)',
    DOP: 'DOP (Dominican Peso)',
    DZD: 'DZD (Algerian Dinar)',
    EGP: 'EGP (Egyptian Pound)',
    ERN: 'ERN (Eritrean Nakfa)',
    ETB: 'ETB (Ethiopian Birr)',
    FJD: 'FJD (Fijian Dollar)',
    FKP: 'FKP (Falkland Islands Pound)',
    GEL: 'GEL (Georgian Lari)',
    GGP: 'GGP (Guernsey Pound)',
    GHS: 'GHS (Ghanaian Cedi)',
    GIP: 'GIP (Gibraltar Pound)',
    GMD: 'GMD (Gambian Dalasi)',
    GNF: 'GNF (Guinean Franc)',
    GTQ: 'GTQ (Guatemalan Quetzal)',
    GYD: 'GYD (Guyanaese Dollar)',
    HKD: 'HKD (Hong Kong Dollar)',
    HNL: 'HNL (Honduran Lempira)',
    HRK: 'HRK (Croatian Kuna)',
    HTG: 'HTG (Haitian Gourde)',
    HUF: 'HUF (Hungarian Forint)',
    IDR: 'IDR (Indonesian Rupiah)',
    ILS: 'ILS (Israeli New Sheqel)',
    IMP: 'IMP (Manx pound)',
    IQD: 'IQD (Iraqi Dinar)',
    IRR: 'IRR (Iranian Rial)',
    ISK: 'ISK (Icelandic Króna)',
    JEP: 'JEP (Jersey Pound)',
    JMD: 'JMD (Jamaican Dollar)',
    JOD: 'JOD (Jordanian Dinar)',
    KES: 'KES (Kenyan Shilling)',
    KGS: 'KGS (Kyrgystani Som)',
    KHR: 'KHR (Cambodian Riel)',
    KMF: 'KMF (Comorian Franc)',
    KPW: 'KPW (North Korean Won)',
    KRW: 'KRW (South Korean Won)',
    KWD: 'KWD (Kuwaiti Dinar)',
    KYD: 'KYD (Cayman Islands Dollar)',
    KZT: 'KZT (Kazakhstani Tenge)',
    LAK: 'LAK (Laotian Kip)',
    LBP: 'LBP (Lebanese Pound)',
    LKR: 'LKR (Sri Lankan Rupee)',
    LRD: 'LRD (Liberian Dollar)',
    LSL: 'LSL (Lesotho Loti)',
    LYD: 'LYD (Libyan Dinar)',
    MAD: 'MAD (Moroccan Dirham)',
    MDL: 'MDL (Moldovan Leu)',
    MGA: 'MGA (Malagasy Ariary)',
    MKD: 'MKD (Macedonian Denar)',
    MMK: 'MMK (Myanma Kyat)',
    MNT: 'MNT (Mongolian Tugrik)',
    MOP: 'MOP (Macanese Pataca)',
    MRU: 'MRU (Mauritanian Ouguiya)',
    MUR: 'MUR (Mauritian Rupee)',
    MVR: 'MVR (Maldivian Rufiyaa)',
    MWK: 'MWK (Malawian Kwacha)',
    MXN: 'MXN (Mexican Peso)',
    MYR: 'MYR (Malaysian Ringgit)',
    MZN: 'MZN (Mozambican Metical)',
    NAD: 'NAD (Namibian Dollar)',
    NGN: 'NGN (Nigerian Naira)',
    NIO: 'NIO (Nicaraguan Córdoba)',
    NOK: 'NOK (Norwegian Krone)',
    NPR: 'NPR (Nepalese Rupee)',
    NZD: 'NZD (New Zealand Dollar)',
    OMR: 'OMR (Omani Rial)',
    PAB: 'PAB (Panamanian Balboa)',
    PEN: 'PEN (Peruvian Nuevo Sol)',
    PGK: 'PGK (Papua New Guinean Kina)',
    PHP: 'PHP (Philippine Peso)',
    PKR: 'PKR (Pakistani Rupee)',
    PLN: 'PLN (Polish Zloty)',
    PYG: 'PYG (Paraguayan Guarani)',
    QAR: 'QAR (Qatari Rial)',
    RON: 'RON (Romanian Leu)',
    RSD: 'RSD (Serbian Dinar)',
    RUB: 'RUB (Russian Ruble)',
    RWF: 'RWF (Rwandan Franc)',
    SAR: 'SAR (Saudi Riyal)',
    SBD: 'SBD (Solomon Islands Dollar)',
    SCR: 'SCR (Seychellois Rupee)',
    SDG: 'SDG (Sudanese Pound)',
    SEK: 'SEK (Swedish Krona)',
    SGD: 'SGD (Singapore Dollar)',
    SHP: 'SHP (Saint Helena Pound)',
    SLE: 'SLE (Sierra Leonean Leone)',
    SLL: 'SLL (Sierra Leonean Leone)',
    SOS: 'SOS (Somali Shilling)',
    SRD: 'SRD (Surinamese Dollar)',
    STD: 'STD (São Tomé and Príncipe Dobra)',
    STN: 'STN (São Tomé and Príncipe Dobra)',
    SVC: 'SVC (Salvadoran Colón)',
    SYP: 'SYP (Syrian Pound)',
    SZL: 'SZL (Swazi Lilangeni)',
    THB: 'THB (Thai Baht)',
    TJS: 'TJS (Tajikistani Somoni)',
    TMT: 'TMT (Turkmenistani Manat)',
    TND: 'TND (Tunisian Dinar)',
    TOP: 'TOP (Tongan Paʻanga)',
    TRY: 'TRY (Turkish Lira)',
    TTD: 'TTD (Trinidad and Tobago Dollar)',
    TVD: 'TVD (Tuvaluan Dollar)',
    TWD: 'TWD (New Taiwan Dollar)',
    TZS: 'TZS (Tanzanian Shilling)',
    UAH: 'UAH (Ukrainian Hryvnia)',
    UGX: 'UGX (Ugandan Shilling)',
    UYU: 'UYU (Uruguayan Peso)',
    UZS: 'UZS (Uzbekistan Som)',
    VED: 'VED (Venezuelan Bolívar)',
    VES: 'VES (Venezuelan Bolívar)',
    VND: 'VND (Vietnamese Dong)',
    VUV: 'VUV (Vanuatu Vatu)',
    WST: 'WST (Samoan Tala)',
    XAF: 'XAF (CFA Franc BEAC)',
    XAG: 'XAG (Silver Ounce)',
    XAU: 'XAU (Gold Ounce)',
    XCD: 'XCD (East Caribbean Dollar)',
    XDR: 'XDR (Special Drawing Rights)',
    XOF: 'XOF (CFA Franc BCEAO)',
    XPD: 'XPD (Palladium Ounce)',
    XPF: 'XPF (CFP Franc)',
    XPT: 'XPT (Platinum Ounce)',
    YER: 'YER (Yemeni Rial)',
    ZAR: 'ZAR (South African Rand)',
    ZMW: 'ZMW (Zambian Kwacha)',
    ZWL: 'ZWL (Zimbabwean Dollar)'
  };

  // Function to get currency display name
  const getCurrencyDisplayName = (currency: string): string => {
    return currencyNames[currency] || `${currency} (${currency})`;
  };

  return (
    <div className="min-h-screen bg-calc-gradient">
      <div className="calculator-container">
        <div className="calculator-header">
          <Link href="/" className="back-btn">← Back</Link>
          <h1>Currency Calculator</h1>
        </div>
        
        {/* Exchange Rate Status */}
        <div className="mb-2 p-2 bg-gray-800 border border-gray-600 rounded-lg flex justify-between items-center">
          <div className="text-xs text-gray-300">
            <span className="font-semibold">Rates: </span>
            {isLoading ? (
              <span className="text-yellow-400">Updating...</span>
            ) : (
              <span className="text-green-400">{lastUpdated}</span>
            )}
          </div>
          <button
            onClick={fetchExchangeRates}
            disabled={isLoading}
            className="px-2 py-1 bg-calc-gold text-gray-900 rounded text-xs font-medium hover:bg-calc-gold-light transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Updating...' : 'Refresh Rates'}
          </button>
        </div>
        
        <div className="calculator">
          <div className="mb-3">
            <label className="block mb-1.5 font-semibold text-sm">
              Amount:
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full p-2.5 rounded-lg border-2 border-gray-200 text-base"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block mb-1.5 font-semibold text-sm">
                From:
              </label>
              <select 
                value={fromCurrency} 
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full p-2 rounded-lg border-2 border-gray-200 text-sm"
              >
                {currencies.map(currency => (
                  <option key={currency} value={currency}>{getCurrencyDisplayName(currency)}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block mb-1.5 font-semibold text-sm">
                To:
              </label>
              <select 
                value={toCurrency} 
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full p-2 rounded-lg border-2 border-gray-200 text-sm"
              >
                {currencies.map(currency => (
                  <option key={currency} value={currency}>{getCurrencyDisplayName(currency)}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-3">
            <label className="block mb-1.5 font-semibold text-sm">
              Custom Exchange Rate (optional):
            </label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="Enter custom rate"
              className="w-full p-2.5 rounded-lg border-2 border-gray-200 text-base"
            />
          </div>

          <div className="flex gap-3 mb-3 justify-center">
            <button className="px-4 py-2 bg-calc-gold text-gray-900 rounded-lg font-medium hover:bg-calc-gold-light transition-colors text-sm" onClick={calculateCurrency}>
              Convert
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors text-sm" onClick={clear}>
              Clear
            </button>
          </div>

          {/* Result Display */}
          {result && (
            <div className="mt-3 p-3 bg-gray-800 border border-gray-600 rounded-lg text-center">
              <div className="text-lg font-bold text-white mb-1">
                {amount} {fromCurrency} =
              </div>
              <div className="text-2xl font-bold text-calc-gold">
                {result} {toCurrency}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                1 {fromCurrency} = {exchangeRates[toCurrency] && exchangeRates[fromCurrency] 
                  ? ((exchangeRates[toCurrency] / exchangeRates[fromCurrency]).toFixed(4))
                  : 'N/A'} {toCurrency}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
