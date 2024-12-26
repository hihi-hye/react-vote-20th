import { useRef, useState } from 'react';
import styled from 'styled-components';
import DownChevronIcon from '@/assets/DownChevronIcon';
import Text from '@/components/atoms/Text';

export interface Option {
  value: string;
  label: string;
}

const Container = styled.div<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.125rem;

  padding: 0.5rem 1rem;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  border-radius: ${({ $isOpen }) => ($isOpen ? '0.5rem 0.5rem 0 0' : '0.5rem')};
`;

const FilterText = styled(Text)`
  color: ${({ theme }) => theme.colors.gray[200]};
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: transparent;
  width: 100%;
  height: 100%;

  z-index: 20; // 임의로 설정
`;

const OptionWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 100%;
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  border-top: none;
  border-radius: 0 0 0.5rem 0.5rem;

  z-index: 21; // 임의로 설정
`;
const OptionItem = styled.button`
  width: 100%;
  padding: 0.5rem 1rem;

  background: transparent;
  border: none;
  outline: none;

  text-align: start;

  cursor: pointer;
`;

type Value = 'sogang' | 'yonsei' | 'ewha' | 'hongik';

const OPTION_LIST: { label: string; value: Value }[] = [
  { label: '서강대학교', value: 'sogang' },
  { label: '연세대학교', value: 'yonsei' },
  { label: '이화여자대학교', value: 'ewha' },
  { label: '홍익대학교', value: 'hongik' },
];

export default function UnivInput() {
  const [value, setValue] = useState<Value | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const selectorRef = useRef<HTMLDivElement | null>(null);
  const optionRef = useRef<HTMLDivElement | null>(null);

  const onOpen = () => {
    setIsOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
  };

  const currentLabel = OPTION_LIST.find(
    (option) => option.value === value,
  )?.label;

  return (
    <div style={{ position: 'relative' }}>
      <Container ref={selectorRef} onClick={onOpen} $isOpen={isOpen}>
        <FilterText variant="body1_rg">
          {currentLabel || '학교 선택'}
        </FilterText>
        <DownChevronIcon />
      </Container>

      {isOpen && (
        <>
          <Backdrop onClick={onClose} />
          <OptionWrapper ref={optionRef}>
            {OPTION_LIST.map((option) => (
              <OptionItem
                key={option.value}
                onClick={() => {
                  setValue(option.value);
                  onClose();
                }}
              >
                <FilterText variant="body1_rg">{option.label}</FilterText>
              </OptionItem>
            ))}
          </OptionWrapper>
        </>
      )}
    </div>
  );
}