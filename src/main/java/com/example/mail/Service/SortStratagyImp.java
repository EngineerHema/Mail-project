package com.example.mail.Service;

import com.example.mail.model.Email;
import org.springframework.stereotype.Service;

@Service
public class SortStratagyImp implements SortStratagy {

    private SortTimeNewToOld sortTimeNewToOld ;
    private SortTimeOldToNew sortTimeOldToNew ;
    private SortPriorityHighToLow sortPriorityHighToLow ;
    private SortPriorityLowToHigh sortPriorityLowToHigh ;
    public SortStratagyImp(SortTimeNewToOld sortTimeNewToOld, SortTimeOldToNew sortTimeOldToNew, SortPriorityHighToLow sortPriorityHighToLow, SortPriorityLowToHigh sortPriorityLowToHigh){
        this.sortTimeNewToOld = sortTimeNewToOld ;
        this.sortTimeOldToNew = sortTimeOldToNew ;
        this.sortPriorityHighToLow = sortPriorityHighToLow ;
        this.sortPriorityLowToHigh = sortPriorityLowToHigh ;
    }
    @Override
    public Sort <Email> setSortingStrategy(String type){
        switch (type.toLowerCase()) {
            case "timeNewToOld":
                return null;
            case "timeOldToNew":
                return null;
            case "PriorityHighToLow":
                return null;
            case "PriorityLowToHigh":
                return null;
            default:
                return null;
        }
    }
}
