import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';
import { Button, Container, SvgIcon } from '@mui/material';

export const CustomersTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
    data,
    openView,
    setOpenView,
    openUpdate,
    setOpenUpdate,
    openDelete,
    setOpenDelete,
    openFiles,
    setOpenFiles,
    cusId,
    setCusId
  } = props;

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Id
                </TableCell>
                <TableCell>
                 customer Name
                </TableCell>
                <TableCell>
                amount
                </TableCell>
                <TableCell>
                installment 
                </TableCell>
                <TableCell>
                payment_period
                </TableCell>
                <TableCell>
                payable_amount
                </TableCell>
                <TableCell>
                arrears
                </TableCell>
                <TableCell>
                status
                </TableCell>
                <TableCell sx={{ alignItems : 'center', justifyContent : 'center', display: 'flex'}}>
                <div>Actions</div>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((customer) => {
                console.log(customer)
                const isSelected = selected.includes(customer?.id);

                return (
                  <TableRow
                    hover
                    key={customer.id}
                    selected={isSelected}
                  >
                    {/* <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(customer.id);
                          } else {
                            onDeselectOne?.(customer.id);
                          }
                        }}
                      />
                    </TableCell> */}
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={0}
                      >
                        {/* <Avatar src={customer.avatar}>
                          {getInitials(customer.name)}
                        </Avatar> */}
                        <Typography variant="subtitle2">
                          {customer.lid} 
                        </Typography>
                      </Stack>
                      </TableCell>
                      <TableCell>
                        {/* {customer.amount} */}
                      </TableCell>
                      <TableCell>
                        {customer.amount}
                      </TableCell>
                      <TableCell>
                        {customer.dailyRental}
                      </TableCell>
                      <TableCell>
                        {customer.payment_period}
                      </TableCell>
                      <TableCell>
                        {customer.payable_amount}
                      </TableCell>
                      <TableCell>
                        {customer.arreas}
                      </TableCell>
                      <TableCell >
                        {customer.status}
                      </TableCell>
                      <TableCell  spacing={2}>
                        <Stack
                          alignItems="center"
                          direction="row"
                          spacing={0}
                        >
                        {/* <Avatar src={customer.avatar}>
                          {getInitials(customer.name)}
                        </Avatar> */}
                         <Button
                          // startIcon={(
                          //   <SvgIcon fontSize="small">
                          //     <PlusIcon />
                          //   </SvgIcon>
                          // )}
                          variant="text"
                          onClick={() => {
                            setCusId(customer?.id)
                            setOpenFiles(true)
                          }}
                        >
                          Add Files
                        </Button>    
                        <Button
                          // startIcon={(
                          //   <SvgIcon fontSize="small">
                          //     <PlusIcon />
                          //   </SvgIcon>
                          // )}
                          variant="text"
                          onClick={() => {
                            setCusId(customer?.id)
                            setOpenView(true)
                          }}
                        >
                          View
                        </Button>
                        <Button
                          // startIcon={(
                          //   <SvgIcon fontSize="small">
                          //     <PlusIcon />
                          //   </SvgIcon>
                          // )}
                          variant="text"
                          onClick={() => {
                            setCusId(customer?.id)
                            setOpenUpdate(true)
                          }}
                        >
                          Update
                        </Button>
                        <Button
                          // startIcon={(
                          //   <SvgIcon fontSize="small">
                          //     <PlusIcon />
                          //   </SvgIcon>
                          // )}
                          variant="text"
                          onClick={() => {
                            setCusId(customer?.id)
                            setOpenDelete(true)
                          }}
                        >
                          Delete
                        </Button>
                                        
                        </Stack>        
                      </TableCell>
                    </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CustomersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};
