'use client';

import styled from 'styled-components';

import Text from '@/components/atoms/Text';
import { convertToViewportHeight } from '@/styles/convertSize';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import CTAButton from '@/components/atoms/CTAButton';
import Card from '@/components/Card';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  margin: 0 1rem;
  gap: 1rem;
`;
const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
`;
export default function Home() {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(`/vote/${path}`);
  };

  return (
    <Container>
      <Text variant="header1">투표 카테고리를 선택하세요</Text>
      <CardWrapper>
        <Card
          size="large"
          content="파트장 투표"
          onClick={() => handleNavigation('part')}
        />

        <Card
          size="large"
          content="데모데이 투표"
          onClick={() => handleNavigation('demo-day')}
        />
      </CardWrapper>
    </Container>
  );
}