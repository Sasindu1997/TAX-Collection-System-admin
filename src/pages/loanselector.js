import { useCallback, useMemo, useState, useEffect } from 'react';
import * as React from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersTable } from 'src/sections/loanselector/customers-table';
import { CustomersSearch } from 'src/sections/loanselector/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import { useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import moment from 'moment';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {SDK} from '../api/index'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6}
ref={ref}
variant="filled"
{...props} />;
});

const now = new Date();

const useCustomers = (page, rowsPerPage) => {
  return useMemo(
    () => {
      // return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useCustomerIds = (customers) => {
  return useMemo(
    () => {
      // return customers.map((customer) => customer.id);
    },
    [customers]
  );
};

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const customers = useCustomers(page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [openFiles, setOpenFiles] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [cusId, setCusId] = useState('');
  const [openSnack, setOpenSnack] = React.useState(false);
  const [snackSeverity, setSnackSeverity] = React.useState(false);
  const [message, setMessage] = React.useState(false);
  const [state, setState] = React.useState({
    opens: false,
    vertical: 'bottom',
    horizontal: 'right',
  });
  const { vertical, horizontal, opens } = state;
  const [customerData, setCustomerData] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [loanGrp, setLoanGrp] = useState('');
  const [guarantees, setGuarantees] = useState([]);
  const [imgsSrc, setImgsSrc] = useState([]);
  const [filesSrc, setFilesSrc] = useState([]);
  const [imgsName, setImgsName] = useState([]);
  const [openBackDrop, setOpenBackDrop] = React.useState(false);
  const { register, handleSubmit, errors, reset } = useForm({
    defaultValues: {
        id: '',
        created: '',
        modified: '',
        payment_start_date: '',
        payment_period: '',
        installment: '',
        amount: '',
        payable_amount: '',
        interest_rate: '',
        arrears: '',
        status: '',
        customer: '',
        loan_group: '',
        guarantees: []
    },
  });
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    setOpenBackDrop(true)
    console.log("SDK: ", SDK);

    SDK.LoanType.getAll()
    .then((res) => {
      console.log("RES: ", res);
      setUsers(res?.data?.results);
      setOpenBackDrop(false)
    })
    .catch((error) => {
      console.log("Error: ", error)
      setSnackSeverity('error');
      setMessage('Error!');
      setOpenSnack(true);
      setOpenBackDrop(false)
    })
  }, [open, openUpdate, openDelete])

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };

  useEffect(() => {
    console.log("cusId: ", cusId);
    setOpenBackDrop(true)
    cusId && SDK.LoanType.getById(cusId)
    .then((res) => {
      console.log("RES: ", res);
      setCustomerData(res?.data);
      setDate(res?.data?.payment_start_date)
      setStatus(res?.data?.status)
      setCustomerId(res?.data?.customer)
      setLoanGrp(res?.data?.loan_group)
      setGuarantees(res?.data?.guarantees)
      reset(res?.data);
      setOpenBackDrop(false)
    })
    .catch((error) => {
      console.log("Error: ", error);
      setOpenBackDrop(false);
      setSnackSeverity('error');
      setMessage('Error!');
      setOpenSnack(true);
    })
  }, [openView === true, openUpdate === true, cusId])

  const handleDatePicker = (e) => {
    console.log(moment(e).format('YYYY-MM-DD'))
    setDate(moment(e).format('YYYY-MM-DD'))
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeCustomerId = (event) => {
    setCustomerId(event.target.value);
  };
  const handleChangeGuarantees = (event) => {
    setGuarantees(event.target.value);
  };
  const handleChangeLoangroup = (event) => {
    setLoanGrp(event.target.value);
  };
  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseFiles = () => {
    setImgsSrc([])
    setFilesSrc([])
    setImgsName([])
    setOpenFiles(false);
  };

  const handleCloseView = () => {
    setOpenView(false);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleDelete = () => {
    cusId && SDK.LoanType.deletebyId(cusId)
    .then((res) => {
      console.log("RES: ", res);
      setOpenDelete(false);
      setSnackSeverity('success');
      setMessage('Record Deleted Sucessfully!');
      setOpenSnack(true);
    })
    .catch((error) => {
      console.log("Error: ", error);
      setOpenDelete(false);
      setSnackSeverity('error');
      setMessage('Error In Record Deletion!');
      setOpenSnack(true);
    })
  };

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleAddNew = () => {
    setOpen(true);
  };

  const handleView = () => {
    setOpenView(true);
  };

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  const handleSubmitFileUpload = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const obj = {
      payment_start_date: date,
      payment_period: data.get('payment_period'),
      amount: data.get('amount'),
      interest_rate: data.get('interest_rate'),
      status: status,
      customer: customerId,
      loan_group: loanGrp,
      guarantees: [
        guarantees
      ]
    }
      
    SDK.LoanFilesType.add(obj)
    .then((res) => {
      console.log("RES: ", res);
      setOpen(false);
      setSnackSeverity('success');
      setMessage('Record Created Sucessfully!');
      setOpenSnack(true);
      setDate("")
      setStatus("")
      setCustomerId("")
      setLoanGrp("")
      setGuarantees("")
    })
    .catch((error) => {
      console.log("Error: ", error);
      setOpen(false);
      setSnackSeverity('error');
      setMessage('Error In Record Creation!');
      setOpenSnack(true);
      setDate("")
      setStatus("")
      setCustomerId("")
      setLoanGrp("")
      setGuarantees("")
    })
  };


  const handleSubmitCreateFiles = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const obj = {
      payment_start_date: date,
      payment_period: data.get('payment_period'),
      amount: data.get('amount'),
      interest_rate: data.get('interest_rate'),
      status: status,
      customer: customerId,
      loan_group: loanGrp,
      guarantees: [
        guarantees
      ]
    }
  };

  return (
    <>
      <Head>
        <title>
          Customers | Devias Kit
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Loans
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                </Stack>
            <CustomersSearch />
            <CustomersTable
              // count={data?.length}
              items={customers}
              onDeselectAll={customersSelection.handleDeselectAll}
              onDeselectOne={customersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={customersSelection.handleSelectAll}
              onSelectOne={customersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={customersSelection.selected}
              data={users?.length > 0 ? users : []}
              openView={openView}
              setOpenView={setOpenView}
              openUpdate={openUpdate}
              setOpenUpdate={setOpenUpdate}
              openDelete={openDelete}
              setOpenDelete={setOpenDelete}
              openFiles={openFiles}
              setOpenFiles={setOpenFiles}
              setCusId={setCusId}
              cusId={cusId}
            />
          </Stack>
          <Snackbar anchorOrigin={{ vertical, horizontal }}
open={openSnack}
autoHideDuration={6000}
onClose={handleCloseSnack}>
            <Alert onClose={handleCloseSnack}
severity={snackSeverity}
sx={{ width: '100%' }}>
              {message}
            </Alert>
          </Snackbar>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={openBackDrop}
            // onClick={handleCloseBackDrop}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          
          <div>
            <Dialog open={openFiles}
              onClose={handleCloseFiles}
              fullWidth
  maxWidth="sm">
              <DialogTitle>Installment Details</DialogTitle>
              <Box component="form"
                onSubmit={handleSubmitCreateFiles}
                noValidate
                sx={{ mt: 1 }}>
              <DialogContent maxWidth={'lg'}>
                      <Typography variant="h8"
                        fullWidth
                        sx={{ pb: 3 }}>
                        Loan Id
                      </Typography>

              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleCloseFiles()}>Cancel</Button>
                <Button type={'submit'}
                  onSubmit={handleSubmitFileUpload}>Download</Button>
              </DialogActions>
              </Box>
            </Dialog>
          </div>
          
          <div>
            <Dialog open={openView}
onClose={handleCloseView}>
              <DialogTitle>View Loan</DialogTitle>
              <Box component="form"
noValidate
sx={{ mt: 1 }}
width={'500px'}>
              <DialogContent>
                {/* <DialogContentText>
                  To subscribe to this website, please enter your email address here. We
                  will send updates occasionally.
                </DialogContentText> */}
                <Typography variant="h6"
                    fullWidth
                    sx={{ mb: 1 }}>
                  Loan Id
                </Typography>
                <Typography variant="h7"
fullWidth
px={'5px'}
sx={{ mt: 2 }}>
                  {customerData?.id || '-'}
                </Typography>

                <Typography variant="h6"
fullWidth
pt={'5px'}
sx={{ mt: 2, mb: 1 }}>
                Customer NIC
                </Typography>
                <Typography variant="p"
fullWidth
px={'5px'}
sx={{ mt: 2 }}>
                  {customerData?.first_name || '-'}
                </Typography>

                <Typography variant="h6"
fullWidth
py={'5px'}
sx={{ mt: 2, mb: 1 }}>
                Amount
                </Typography>
                <Typography variant="p"
fullWidth
px={'5px'}
py={'5px'}
sx={{ mt: 2 }}>
                  {customerData?.amount || '-'}
                </Typography>

                <Typography variant="h6"
fullWidth
py={'5px'}
sx={{ mt: 2, mb: 1 }}>
                Payable Amount
                </Typography>
                <Typography variant="p"
fullWidth
px={'5px'}
sx={{ mt: 2 }}>
                  {customerData?.payable_amount || '-'}
                </Typography>

                <Typography variant="h6"
fullWidth
sx={{ mt: 2, mb: 1 }}>
                Arrears
                </Typography>
                <Typography variant="p"
fullWidth
px={'5px'}
sx={{ mt: 2 }}>
                  {customerData?.arrears || '-'}
                </Typography>

                <Typography variant="h6"
fullWidth
sx={{ mt: 2, mb: 1 }}>
                Installment
                </Typography>
                <Typography variant="p"
fullWidth
px={'5px'}
sx={{ mt: 2 }}>
                  {customerData?.installment || '-'}
                </Typography>

                <Typography variant="h6"
fullWidth
sx={{ mt: 2, mb: 1 }}>
                Payment Period
                </Typography>
                <Typography variant="p"
fullWidth
px={'5px'}
sx={{ mt: 2 }}>
                  {customerData?.payment_period || '-'}
                </Typography>

                <Typography variant="h6"
fullWidth
sx={{ mt: 2, mb: 1 }}>
                Payment Start Date
                </Typography>
                <Typography variant="p"
fullWidth
px={'5px'}
sx={{ mt: 2 }}>
                  {moment(customerData?.payment_start_date).format('DD-MM-YYYY') || '-'}
                </Typography>

                <Typography variant="h6"
fullWidth
sx={{ mt: 2, mb: 1 }}>
                status
                </Typography>
                <Typography variant="p"
fullWidth
px={'5px'}
sx={{ mt: 2 }}>
                  {customerData?.status || '-'}
                </Typography>

                <Typography variant="h6"
fullWidth
sx={{ mt: 2, mb: 1 }}>
                Loan Group
                </Typography>
                <Typography variant="p"
fullWidth
px={'5px'}
sx={{ mt: 2 }}>
                  {customerData?.loan_group || '-'}
                </Typography>

                <Typography variant="h6"
fullWidth
sx={{ mt: 2, mb: 1 }}>
                  Guarantees
                </Typography>
                <Typography variant="p"
fullWidth
px={'5px'}
sx={{ mt: 2 }}>
                  {customerData?.route || '-'}
                </Typography>

                <Typography variant="h6"
fullWidth
sx={{ mt: 2, mb: 1 }}>
                Loan Created Date
                </Typography>
                <Typography variant="p"
fullWidth
px={'5px'}
sx={{ mt: 2 }}>
                  {moment(customerData?.payment_start_date).format('DD-MM-YYYY') || '-'}
                </Typography>

              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseView}>Close</Button>
              </DialogActions>
              </Box>
            </Dialog>
          </div>
          </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
