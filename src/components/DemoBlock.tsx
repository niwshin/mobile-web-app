import React, { memo, ReactNode } from 'react';
import styled from 'styled-components';

const DemoTitle = styled.h3`
  background: var(--adm-color-border);
  color: #697b8c;
  size: 14px;
  padding: 1rem 0 8px 1rem;
`;

interface DemoBlockProps {
  title: string;
  children?: ReactNode;
}

const DemoBlock = ({ title, children }: DemoBlockProps) => (
  <>
    <DemoTitle className="demo-title">{title || ''}</DemoTitle>
    <div className="demo-contents">{children}</div>
  </>
);

export default memo(DemoBlock);
