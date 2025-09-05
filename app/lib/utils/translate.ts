import translator from 'open-google-translator';

export type SupportedLang = 'en' | 'ru' | 'hi';

export const translateText = async (
  text: string | string[],
  targetLang: SupportedLang = 'en'
): Promise<string | string[]> => {
  try {
    if (targetLang === 'en') return text;
    console.log('texttext', text);
    console.log('textargetLangttext', targetLang);
    const listToTranslate = Array.isArray(text) ? text : [text];

    // @ts-ignore: library types are missing
    const result: any[] = await translator.TranslateLanguageData({
      listOfWordsToTranslate: listToTranslate,
      fromLanguage: 'en',
      toLanguage: targetLang
    });
    console.log('!!!!!' , result)
    const translatedList = result.map(item => item.translatedText);
    console.log('====' , Array.isArray(text) ? translatedList : translatedList[0])
    return Array.isArray(text) ? translatedList : translatedList[0];
  } catch (err) {
    console.error('Translation error:', err);
    return text;
  }
};
