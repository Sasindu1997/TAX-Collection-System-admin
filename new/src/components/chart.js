import dynamic from 'next/dynamic';
import { styled } from '@mui/material/styles';

const ApexChart = dynamic((e) => import('react-apexcharts'), {
  ssr: false,
  loading: (e) => null
});

export const Chart = styled(ApexChart)``;
