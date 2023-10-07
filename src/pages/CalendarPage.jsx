import classes from './styles/CalendarPage.module.css'
import { Button } from '@chakra-ui/react'
function Calendar()
{
    return (
        <div className={classes.wrapper}>
            <div className={classes.calendar}>
            </div>
            <div className={classes.tasks}>
                <ul className={classes.list}>
                    <li className={classes.task}>task</li>
                    <li className={classes.task}>task</li>
                    <li className={classes.task}>task</li>
                    <li className={classes.task}>task</li>
                    <li className={classes.task}>task</li>
                </ul>
            </div>
        </div>
    )
}

export default Calendar;