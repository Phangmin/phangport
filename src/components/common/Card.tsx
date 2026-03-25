import styled from 'styled-components';

// 2. 프로젝트 카드 틀 (그림자 효과)
export const ProjectCard = styled.div`
  background: white;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px); /* 마우스 올리면 살짝 들리는 효과 */
  }
`;