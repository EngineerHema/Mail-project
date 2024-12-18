package com.example.mail.Service.EmailFacade;

import com.example.mail.Service.Filter.Filter;
import com.example.mail.Service.Filter.FilterStrategy;
import com.example.mail.Service.Search.Search;
import com.example.mail.Service.Search.SearchStratagy;
import com.example.mail.Service.Sort.Sort;
import com.example.mail.Service.Sort.SortStratagy;
import com.example.mail.model.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class EmailFacadeImp implements EmailFacade{

    private FilterStrategy filterStrategy;
    private SortStratagy sortStratagy;
    private SearchStratagy searchStratagy;

    @Autowired
    public EmailFacadeImp(FilterStrategy filterStrategy, SortStratagy sortStratagy, SearchStratagy searchStratagy) {
        this.filterStrategy = filterStrategy;
        this.sortStratagy = sortStratagy;
        this.searchStratagy = searchStratagy;
    }


    @Override
    public List<Email> modifyEmail(List<Email> emails, String type, String sort,String search, String substring) {

        Filter<Email> filter = filterStrategy.setFilteringStrategy(type);
        Sort<Email> sortingMethod = sortStratagy.setSortingStrategy(sort);
        Search<Email> searchingMethod = searchStratagy.setSearchingStrategy(search);
        emails = filter.applyFilter(emails, type);
        emails = sortingMethod.applySort(emails);
        if (!substring.equals("")&&!substring.equals(null)&&substring.length()>0){
            emails = searchingMethod.applySearch(emails, substring);
        }
        return emails;
    }
}
