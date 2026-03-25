import styled from 'styled-components';

// 3. 섹션 제목 (강조선 포함)
export const SectionTitle = styled.h2`
  font-size: 28px;
  color: #1a1a1a;
  margin-bottom: 30px;
  position: relative;
  
  &::after {
    content: '';
    display: block;
    width: 40px;
    height: 4px;
    background: #0064DE;
    margin-top: 8px;
  }
`;