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
import { CustomersTable } from 'src/sections/loans/customers-table';
import { CustomersSearch } from 'src/sections/loans/customers-search';
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

const data = [
  {
    id: '5e887ac47eed253091be10cb',
    address: {
      city: 'Cleveland',
      country: 'USA',
      state: 'Ohio',
      street: '2849 Fulton Street'
    },
    avatar: '/assets/avatars/avatar-carson-darrin.png',
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    email: 'carson.darrin@devias.io',
    name: 'Carson Darrin',
    phone: '304-428-3097'
  },
  {
    id: '5e887b209c28ac3dd97f6db5',
    address: {
      city: 'Atlanta',
      country: 'USA',
      state: 'Georgia',
      street: '1865  Pleasant Hill Road'
    },
    avatar: '/assets/avatars/avatar-fran-perez.png',
    createdAt: subDays(subHours(now, 1), 2).getTime(),
    email: 'fran.perez@devias.io',
    name: 'Fran Perez',
    phone: '712-351-5711'
  },
  {
    id: '5e887b7602bdbc4dbb234b27',
    address: {
      city: 'North Canton',
      country: 'USA',
      state: 'Ohio',
      street: '4894  Lakeland Park Drive'
    },
    avatar: '/assets/avatars/avatar-jie-yan-song.png',
    createdAt: subDays(subHours(now, 4), 2).getTime(),
    email: 'jie.yan.song@devias.io',
    name: 'Jie Yan Song',
    phone: '770-635-2682'
  },
  {
    id: '5e86809283e28b96d2d38537',
    address: {
      city: 'Madrid',
      country: 'Spain',
      name: 'Anika Visser',
      street: '4158  Hedge Street'
    },
    avatar: '/assets/avatars/avatar-anika-visser.png',
    createdAt: subDays(subHours(now, 11), 2).getTime(),
    email: 'anika.visser@devias.io',
    name: 'Anika Visser',
    phone: '908-691-3242'
  },
  {
    id: '5e86805e2bafd54f66cc95c3',
    address: {
      city: 'San Diego',
      country: 'USA',
      state: 'California',
      street: '75247'
    },
    avatar: '/assets/avatars/avatar-miron-vitold.png',
    createdAt: subDays(subHours(now, 7), 3).getTime(),
    email: 'miron.vitold@devias.io',
    name: 'Miron Vitold',
    phone: '972-333-4106'
  },
  {
    id: '5e887a1fbefd7938eea9c981',
    address: {
      city: 'Berkeley',
      country: 'USA',
      state: 'California',
      street: '317 Angus Road'
    },
    avatar: '/assets/avatars/avatar-penjani-inyene.png',
    createdAt: subDays(subHours(now, 5), 4).getTime(),
    email: 'penjani.inyene@devias.io',
    name: 'Penjani Inyene',
    phone: '858-602-3409'
  },
  {
    id: '5e887d0b3d090c1b8f162003',
    address: {
      city: 'Carson City',
      country: 'USA',
      state: 'Nevada',
      street: '2188  Armbrester Drive'
    },
    avatar: '/assets/avatars/avatar-omar-darboe.png',
    createdAt: subDays(subHours(now, 15), 4).getTime(),
    email: 'omar.darobe@devias.io',
    name: 'Omar Darobe',
    phone: '415-907-2647'
  },
  {
    id: '5e88792be2d4cfb4bf0971d9',
    address: {
      city: 'Los Angeles',
      country: 'USA',
      state: 'California',
      street: '1798  Hickory Ridge Drive'
    },
    avatar: '/assets/avatars/avatar-siegbert-gottfried.png',
    createdAt: subDays(subHours(now, 2), 5).getTime(),
    email: 'siegbert.gottfried@devias.io',
    name: 'Siegbert Gottfried',
    phone: '702-661-1654'
  },
  {
    id: '5e8877da9a65442b11551975',
    address: {
      city: 'Murray',
      country: 'USA',
      state: 'Utah',
      street: '3934  Wildrose Lane'
    },
    avatar: '/assets/avatars/avatar-iulia-albu.png',
    createdAt: subDays(subHours(now, 8), 6).getTime(),
    email: 'iulia.albu@devias.io',
    name: 'Iulia Albu',
    phone: '313-812-8947'
  },
  {
    id: '5e8680e60cba5019c5ca6fda',
    address: {
      city: 'Salt Lake City',
      country: 'USA',
      state: 'Utah',
      street: '368 Lamberts Branch Road'
    },
    avatar: '/assets/avatars/avatar-nasimiyu-danai.png',
    createdAt: subDays(subHours(now, 1), 9).getTime(),
    email: 'nasimiyu.danai@devias.io',
    name: 'Nasimiyu Danai',
    phone: '801-301-7894'
  }
];

const useCustomers = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useCustomerIds = (customers) => {
  return useMemo(
    () => {
      return customers.map((customer) => customer.id);
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

  const handleSubmitCreate = (event) => {
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
      
    SDK.LoanType.add(obj)
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
      
    // SDK.LoanType.add(obj)
    // .then((res) => {
    //   console.log("RES: ", res);
    //   setOpen(false);
    //   setSnackSeverity('success');
    //   setMessage('Record Created Sucessfully!');
    //   setOpenSnack(true);
    //   setDate("")
    //   setStatus("")
    //   setCustomerId("")
    //   setLoanGrp("")
    //   setGuarantees("")
    // })
    // .catch((error) => {
    //   console.log("Error: ", error);
    //   setOpen(false);
    //   setSnackSeverity('error');
    //   setMessage('Error In Record Creation!');
    //   setOpenSnack(true);
    //   setDate("")
    //   setStatus("")
    //   setCustomerId("")
    //   setLoanGrp("")
    //   setGuarantees("")
    // })
  };

  const handleSubmitUpdate = (values) => {
    console.log(values)
    const obj = {
        payment_start_date: date,
        payment_period: values.payment_period,
        amount: values.amount,
        interest_rate: values.interest_rate,
        status: status,
        customer: customerId,
        loan_group: loanGrp,
        guarantees: guarantees
    }
    console.log(obj);
    
    cusId && SDK.LoanType.updatePatch(cusId, obj)
    .then((res) => {
      console.log("RES: ", res);
      setOpenUpdate(false);
      setSnackSeverity('success');
      setMessage('Record Updated Sucessfully!');
      setOpenSnack(true);
      setDate("")
      setStatus("")
      setCustomerId("")
      setLoanGrp("")
      setGuarantees("")
    })
    .catch((error) => {
      console.log("Error: ", error);
      setOpenUpdate(false);
      setSnackSeverity('error');
      setMessage('Error In Record Update!');
      setOpenSnack(true);
      setDate("")
      setStatus("")
      setCustomerId("")
      setLoanGrp("")
      setGuarantees("")
    })
  };

  const onChange = (e) => {
    console.log(e.target.files)
    for (const file of e.target.files) {
      if(file.type == "image/jpeg" || file.type == "image/png"){
        setImgsName((imgs) => [...imgs, file.name]);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setImgsSrc((imgs) => [...imgs, reader.result]);
        };
        reader.onerror = () => {
          console.log(reader.error);
        };
      }else {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setFilesSrc((imgs) => [...imgs, reader.result]);
        };
        reader.onerror = () => {
          console.log(reader.error);
        };
      }
    }
  };

  const onChangeFiles = (e) => {
    console.log(e.target.files)
    for (const file of e.target.files) {
      setImgsName((imgs) => [...imgs, file.name]);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImgsSrc((imgs) => [...imgs, reader.result]);
      };
      reader.onerror = () => {
        console.log(reader.error);
      };
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
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>
              <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                  onClick={handleAddNew}
                >
                  Add
                </Button>
              </div>
            </Stack>
            <CustomersSearch />
            <CustomersTable
              count={data.length}
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
            <Dialog open={open}
onClose={handleClose}>
              <DialogTitle>Add New Loan</DialogTitle>
              <Box component="form"
onSubmit={handleSubmitCreate}
noValidate
sx={{ mt: 1 }}>
              <DialogContent>
                {/* <DialogContentText>
                  To subscribe to this website, please enter your email address here. We
                  will send updates occasionally.
                </DialogContentText> */}
                <Typography variant="h8"
                    fullWidth
                    sx={{ mb: 1 }}>
                  Loan Start Date
                </Typography>
                <div>
                   <DatePicker
                    renderInput={(inputProps) => <TextField {...inputProps}
variant="outlined" />}
                    slotProps={{ textField: { variant: 'outlined' } }}
                    onChange={(e) => handleDatePicker(e)}
                    value={date}
                  />
                </div>
                <TextField
                  autoFocus
                  margin="dense"
                  name="payment_period"
                  id="payment_period"
                  label="Loan Period"
                  fullWidth
                  type='number'
                  variant="standard"
                />
                 <Typography variant="h8"
                    fullWidth
                    sx={{ mb: 1 }}>
                  Loan Status
                </Typography>
                <Select
                  labelId="demo-simple-select-label"
                  value={status}
                  name="status"
                  id="status"
                  label="Loan Status"
                  fullWidth
                  variant="standard"
                  onChange={handleChangeStatus}
                >
                  <MenuItem value={'PENDING'}>Pending</MenuItem>
                  <MenuItem value={'Accepted'}>Accepted</MenuItem>
                </Select>
                <TextField
                  autoFocus
                  margin="dense"
                  name="interest_rate"
                  id="interest_rate"
                  label="Interest Rate"
                  fullWidth
                  variant="standard"
                />  
                 <TextField
                  autoFocus
                  margin="dense"
                  name="amount"
                  id="amount"
                  label="Amount"
                  fullWidth
                  variant="standard"
                />
                 <Typography variant="h8"
                    fullWidth
                    sx={{ mb: 1 }}>
                  Customer
                </Typography>
                <Select
                  labelId="demo-simple-select-label"
                  value={customerId}
                  name="customerId"
                  id="customerId"
                  label="Customer"
                  fullWidth
                  variant="standard"
                  onChange={handleChangeCustomerId}
                >
                  <MenuItem value={'1'}>Customer 1</MenuItem>
                  <MenuItem value={'2'}>Customer 2</MenuItem>
                </Select>
                <Typography variant="h8"
                    fullWidth
                    sx={{ mb: 1 }}>
                  Loan Group
                </Typography>
                <Select
                  labelId="demo-simple-select-label"
                  value={loanGrp}
                  name="loanGrp"
                  id="loanGrp"
                  label="Loan Group"
                  fullWidth
                  variant="standard"
                  onChange={handleChangeLoangroup}
                >
                  <MenuItem value={'4'}>loan_group 4</MenuItem>
                </Select>
                <Typography variant="h8"
                    fullWidth
                    sx={{ mb: 1 }}>
                  Guarantees
                </Typography>
                <Select
                 labelId="demo-simple-select-label"
                 value={guarantees}
                 name="guarantees"
                 id="guarantees"
                 label="Guarantees"
                 fullWidth
                 variant="standard"
                 onChange={handleChangeGuarantees}
                >
                  <MenuItem value={'1'}>Guarantees 1</MenuItem>
                  <MenuItem value={'2'}>Guarantees 2</MenuItem>
                </Select>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleClose()}>Cancel</Button>
                <Button type={'submit'}
                  onSubmit={handleSubmitCreate}>Save</Button>
              </DialogActions>
              </Box>
            </Dialog>
          </div>
          <div>
            <Dialog open={openFiles}
              onClose={handleCloseFiles}>
              <DialogTitle>Add Images / Files</DialogTitle>
              <Box component="form"
                onSubmit={handleSubmitCreateFiles}
                noValidate
                sx={{ mt: 1 }}>
              <DialogContent>
                      <Typography variant="h8"
                        fullWidth
                        sx={{ pb: 3 }}>
                        Upload Images
                      </Typography>
                      <div>
                      <input sx={{ mt: 3 }}
                        onChange={onChange}
                        type="file"
                        name="file"
                        multiple />
                      {imgsName.map((index, name) => (
                        <Typography key={index}
                          variant="h8"
                          fullWidth
                          sx={{ mb: 1 }}>
                          {name}
                        </Typography>
                      ))}
                    </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleCloseFiles()}>Cancel</Button>
                <Button type={'submit'}
                  onSubmit={handleSubmitFileUpload}>Save</Button>
              </DialogActions>
              </Box>
            </Dialog>
          </div>
          <div>
            <Dialog open={openUpdate}
                onClose={handleCloseUpdate}>
              <DialogTitle>Update Loan</DialogTitle>
              <Box component="form"
                onSubmit={handleSubmit(handleSubmitUpdate)}
                noValidate
                sx={{ mt: 1 }}>
              <DialogContent>
                {/* <DialogContentText>
                  To subscribe to this website, please enter your email address here. We
                  will send updates occasionally.
                </DialogContentText> */}
                <Typography variant="h8"
                    fullWidth
                    sx={{ mb: 1 }}>
                  Loan Start Date
                </Typography>
                <div>
                   <DatePicker
                    renderInput={(inputProps) => <TextField {...inputProps}
                    variant="outlined" />}
                    slotProps={{ textField: { variant: 'outlined' } }}
                    onChange={(e) => handleDatePicker(e)}
                    value={date}
                  />
                </div>
                <TextField
                  {...register("payment_period")}
                  autoFocus
                  margin="dense"
                  name="payment_period"
                  id="payment_period"
                  label="Loan Period"
                  fullWidth
                  type='number'
                  variant="standard"
                />
                 <Typography variant="h8"
                    fullWidth
                    sx={{ mb: 1 }}>
                  Loan Status
                </Typography>
                <Select
                  labelId="demo-simple-select-label"
                  value={status}
                  name="status"
                  id="status"
                  label="Loan Status"
                  fullWidth
                  variant="standard"
                  onChange={handleChangeStatus}
                >
                  <MenuItem value={'PENDING'}>Pending</MenuItem>
                  <MenuItem value={'Accepted'}>Accepted</MenuItem>
                </Select>
                <TextField
                  {...register("interest_rate")}
                  autoFocus
                  margin="dense"
                  name="interest_rate"
                  id="interest_rate"
                  label="Interest Rate"
                  fullWidth
                  variant="standard"
                />  
                 <TextField
                 {...register("amount")}
                  autoFocus
                  margin="dense"
                  name="amount"
                  id="amount"
                  label="Amount"
                  fullWidth
                  variant="standard"
                />
                 <Typography variant="h8"
                    fullWidth
                    sx={{ mb: 1 }}>
                  Customer
                </Typography>
                <Select
                  labelId="demo-simple-select-label"
                  value={customerId}
                  name="customerId"
                  id="customerId"
                  label="Customer"
                  fullWidth
                  variant="standard"
                  onChange={handleChangeCustomerId}
                >
                  <MenuItem value={'1'}>Customer 1</MenuItem>
                  <MenuItem value={'2'}>Customer 2</MenuItem>
                </Select>
                <Typography variant="h8"
                    fullWidth
                    sx={{ mb: 1 }}>
                  Loan Group
                </Typography>
                <Select
                  labelId="demo-simple-select-label"
                  value={loanGrp}
                  name="loanGrp"
                  id="loanGrp"
                  label="Loan Group"
                  fullWidth
                  variant="standard"
                  onChange={handleChangeLoangroup}
                >
                  <MenuItem value={'4'}>loan_group 4</MenuItem>
                </Select>
                <Typography variant="h8"
                    fullWidth
                    sx={{ mb: 1 }}>
                  Guarantees
                </Typography>
                <Select
                 labelId="demo-simple-select-label"
                 value={guarantees}
                 multiple
                 name="guarantees"
                 id="guarantees"
                 label="Guarantees"
                 fullWidth
                 variant="standard"
                 onChange={handleChangeGuarantees}
                >
                  <MenuItem value={'1'}>Guarantees 1</MenuItem>
                  <MenuItem value={'2'}>Guarantees 2</MenuItem>
                </Select>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleCloseUpdate()}>Cancel</Button>
                <Button type={'submit'}
onSubmit={handleSubmit(handleSubmitUpdate)}>Save</Button>
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
          <div>
            <Dialog open={openDelete}
                    onClose={handleCloseDelete}>
              <DialogTitle>Delete Customer</DialogTitle>
              <Box component="form"
                    noValidate
                    sx={{ mt: 1 }}
                    width={'500px'}>
              <DialogContent>
                {/* <DialogContentText>
                  To subscribe to this website, please enter your email address here. We
                  will send updates occasionally.
                </DialogContentText> */}

                <Typography variant="h8"
                    fullWidth
                    sx={{ mb: 1 }}>
                  Are You Sure You Want To Delete This Record? 
                </Typography>

              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDelete}>Close</Button>
                <Button onClick={handleDelete}>Confirm</Button>
              </DialogActions>
              </Box>
            </Dialog>
          </div>
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
