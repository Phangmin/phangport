import type { LanguageCode } from '../hooks/useLanguage'

type PortfolioPageCopy = {
  eyebrow: string
  title: string
  description: string
  featuredLabel: string
  featuredTitle: string
  featuredDescription: string
  featuredCta: string
  featuredMeta: string
  pdfLabel: string
  pdfTitle: string
  pdfDescription: string
  pdfCta: string
  pdfMeta: string
  pdfPreviewLabel: string
}

export const portfolioPageCopyByLanguage: Record<LanguageCode, PortfolioPageCopy> = {
  ko: {
    eyebrow: 'Portfolio',
    title: '포트폴리오를 미리 보고 바로 확인하실 수 있도록 구성했습니다.',
    description:
      'Notion과 PDF 두 가지 형식으로 준비했습니다. 자세한 기록은 Notion에서, 파일 공유나 출력은 PDF가 유용하니 편하신 방법으로 이용하시기 바랍니다.',
    featuredLabel: 'Preview',
    featuredTitle: 'Notion 포트폴리오',
    featuredDescription:
      '프로젝트와 작업 과정을 길고 자세한 흐름으로 보고 싶다면 Notion 버전이 가장 적합합니다. 구조와 맥락이 한 번에 보이도록 정리했습니다.',
    featuredCta: 'Notion 보기',
    featuredMeta: '실시간 업데이트 확인 가능한 버전',
    pdfLabel: 'Download',
    pdfTitle: 'PDF 포트폴리오',
    pdfDescription:
      '파일 형태로 바로 다운로드하여 확인하실 수 있습니다. 출력물이 필요하신 경우 파일을 다운로드받아 사용해보세요.',
    pdfCta: 'PDF 다운로드',
    pdfMeta: '공유나 출력에 유용한 버전',
    pdfPreviewLabel: 'PDF Preview Coming Soon',
  },
  en: {
    eyebrow: 'Portfolio',
    title: 'A portfolio layout built around previews first.',
    description:
      'The Notion version already uses a real preview image, while the PDF block is prepared with the same structure so a thumbnail can be dropped in later without changing the layout.',
    featuredLabel: 'Preview',
    featuredTitle: 'Notion Portfolio',
    featuredDescription:
      'If you want the longer and more detailed version of my projects and process, the Notion portfolio is the primary format. It is structured to show both context and flow clearly.',
    featuredCta: 'Open Notion',
    featuredMeta: 'The version that can stay continuously updated',
    pdfLabel: 'Download',
    pdfTitle: 'PDF Portfolio',
    pdfDescription:
      'This is the downloadable version for quick sharing. The preview area is already prepared so a real PDF thumbnail can be added later without changing the structure.',
    pdfCta: 'Download PDF',
    pdfMeta: 'A version suited for offline sharing',
    pdfPreviewLabel: 'PDF Preview Coming Soon',
  },
}
