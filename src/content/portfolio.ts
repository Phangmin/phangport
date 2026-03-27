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
    title: '포트폴리오를 미리보기와 함께 확인할 수 있도록 구성했습니다.',
    description:
      'Notion 포트폴리오는 실제 미리보기 이미지를 중심으로 보여주고, PDF는 이후 썸네일이 들어갈 수 있도록 같은 구조로 자리만 먼저 잡아둔 상태입니다.',
    featuredLabel: 'Preview',
    featuredTitle: 'Notion 포트폴리오',
    featuredDescription:
      '프로젝트와 작업 과정을 더 길고 자세한 흐름으로 읽고 싶다면 Notion 버전이 가장 적합합니다. 구조와 맥락을 한 번에 보여줄 수 있도록 정리했습니다.',
    featuredCta: 'Notion 열기',
    featuredMeta: '실시간 업데이트 가능한 버전',
    pdfLabel: 'Download',
    pdfTitle: 'PDF 포트폴리오',
    pdfDescription:
      '파일 형태로 바로 내려받아 확인할 수 있는 버전입니다. 추후 실제 PDF 미리보기 이미지를 같은 비율 영역에 연결할 수 있도록 구성했습니다.',
    pdfCta: 'PDF 다운로드',
    pdfMeta: '오프라인으로 공유하기 좋은 버전',
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
