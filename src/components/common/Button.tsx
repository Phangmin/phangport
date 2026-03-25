import styled from 'styled-components';

// 1. 공통 버튼 (대한항공 블루 테마)
export const PrimaryButton = styled.button`
  background-color: #0064DE;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #004BA3;
  }
`;



